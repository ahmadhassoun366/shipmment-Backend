// controllers/shipmentsController.js
const Shipment = require("../models/shipments");
const ShipmentItem = require("../models/shipmentItem");
const Warehouse = require("../models/warehouse");

const feeConfig = {
  baseFee: 50,
  sensitivityMultiplier: 1.25,
  typeFees: {
    Electronics: 1.2,
    Clothing: 1.0,
    Furniture: 1.5,
    Pharmaceuticals: 1.3,
    Food: 1.1,
    Other: 1.0,
  },
  quantityDiscounts: [
    { threshold: 50, discountFactor: 0.95 }, // 5% discount for quantities over 50
    { threshold: 100, discountFactor: 0.9 }, // 10% discount for quantities over 100
    { threshold: 200, discountFactor: 0.85 }, // 15% discount for quantities over 200
  ],
};

async function createShipment(req, res) {
  try {
    const {
      customer_id,
      receiver_id,
      origin,
      destination,
      shipmentDate,
      expectedDeliveryDate,
      status,
      warehouseID,
      items,
    } = req.body;

    let totalShipmentFee = 0;

    const Items = [];
    for (const item of items) {
      const newItem = await ShipmentItem.create({
        name: item.name,
        quantity: item.quantity,
        isSensitive: item.isSensitive || false,
        type: item.type,
      });
      Items.push(newItem._id);

      let itemFee = feeConfig.baseFee * feeConfig.typeFees[item.type];

      // Apply sensitivity multiplier
      if (item.isSensitive) {
        itemFee *= feeConfig.sensitivityMultiplier;
      }

      // Apply quantity discount
      const discount = feeConfig.quantityDiscounts.find(
        (d) => item.quantity > d.threshold
      );
      if (discount) {
        itemFee *= discount.discountFactor;
      }

      totalShipmentFee += itemFee * item.quantity;
    }

    const newShipment = await Shipment.create({
      customer_id,
      receiver_id,
      origin,
      destination,
      shipmentDate,
      expectedDeliveryDate,
      status,
      warehouseID,
      Items: Items,
    });

    res.status(201).json({
      shipment: newShipment,
      totalFee: totalShipmentFee,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: error.message });
  }
}

// Controller method to retrieve all shipments
async function getShipments(req, res) {
  try {
    const shipments = await Shipment.find().populate("Items");
    res.json(shipments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Controller method to retrieve a shipment by ID
async function getShipmentById(req, res) {
  try {
    const shipmentId = req.query.id;
    if (!shipmentId) {
      return res.status(400).json({ message: "Shipment ID is required" });
    }

    const shipment = await Shipment.findById(shipmentId).populate("Items");

    if (!shipment) {
      return res.status(404).json({ message: "Shipment not found" });
    }
    res.json(shipment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// controllers/shipmentsController.js

async function updateShipment(req, res) {
  const { id } = req.params;
  console.log("Updating shipment with ID:", id); // Log the ID
  console.log("Request data:", req.body); // Log the full request body

  try {
    const shipment = await Shipment.findById(id);
    if (!shipment) {
      console.log("No shipment found for ID:", id);
      return res.status(404).json({ message: "Shipment not found" });
    }

    // Update operations here, with logs after each operation
    shipment.origin = req.body.shipmentData.origin || shipment.origin;
    shipment.destination = req.body.shipmentData.destination || shipment.destination;
    shipment.status = req.body.shipmentData.status || shipment.status;

    console.log("Updated shipment details:", shipment);

    // Save and respond
    await shipment.save();
    res.json({ message: "Shipment updated successfully", shipment });
  } catch (error) {
    console.error("Error updating shipment:", error);
    res.status(500).json({ message: error.message });
  }
}


// Controller method to delete a shipment
async function deleteShipment(req, res) {
  try {
    const deletedShipment = await Shipment.findByIdAndDelete(req.params.id);
    if (!deletedShipment) {
      return res.status(404).json({ message: "Shipment not found" });
    }
    res.json({ message: "Shipment deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
// Controller method to retrieve shipments by user ID
// controllers/shipmentsController.js
async function getShipmentsByUserId(req, res) {
  try {
    const userId = req.query.userId; // Get userId from query parameters
    const employeeId = req.query.employeeId;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const shipments = await Shipment.find({
      $or: [
        { customer_id: userId },
        { receiver_id: userId },
        { employeeId: userId },
      ],
    }).populate("Items");

    if (shipments.length === 0) {
      return res
        .status(404)
        .json({ message: "No shipments found for the provided user ID" });
    }

    res.json(shipments);
  } catch (error) {
    console.error("Error retrieving shipments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// controllers/shipmentsController.js
async function updateShipmentStatus(req, res) {
  const { id } = req.params;
  const { newStatus } = req.body;

  try {
    const shipment = await Shipment.findById(id);
    if (!shipment) {
      return res.status(404).json({ message: "Shipment not found" });
    }

    console.log("Authenticated user details:", req.user);

    shipment.status = newStatus;
    await shipment.save();
    res.json({ message: "Shipment status updated successfully" });
  } catch (error) {
    console.error("Error updating shipment status:", error);
    res.status(500).json({ message: error.message });
  }
}

// controllers/shipmentsController.js

// create function to update the expected delivery date of a shipment
async function updateShipmentExpirationDate(req, res) {
  const { id } = req.params;
  const { newExpirationDate } = req.body;

  const date = new Date(newExpirationDate);
  if (isNaN(date.getTime())) {
    // date.getTime() is NaN if date is not valid
    return res.status(400).json({ message: "Invalid date format" });
  }

  try {
    const shipment = await Shipment.findById(id);
    if (!shipment) {
      return res.status(404).json({ message: "Shipment not found" });
    }

    shipment.expectedDeliveryDate = date;
    await shipment.save();
    res.json({
      message: "Shipment expected delivery date updated successfully",
    });
  } catch (error) {
    console.error("Error updating shipment expected delivery date:", error);
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createShipment,
  getShipments,
  getShipmentById,
  updateShipment,
  deleteShipment,
  updateShipmentStatus,
  getShipmentsByUserId,
  updateShipmentExpirationDate,
};

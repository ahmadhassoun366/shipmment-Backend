// controllers/shipmentsController.js
const Shipment = require("../models/shipments");
const ShipmentItem = require("../models/shipmentItem");

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

    // Create shipment items first
    const Items = [];
    for (const item of items) {
      const newItem = await ShipmentItem.create({
        name: item.name,
        quantity: item.quantity,
        customer_id: customer_id,
        isSensitive: item.isSensitive || false
      });
      Items.push(newItem._id); // Use MongoDB's _id as item_id
    }

    // Create the shipment with the new shipment items
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

    res.status(201).json(newShipment);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ data: error.message });
  }
}

  
  

// Controller method to retrieve all shipments
async function getShipments(req, res) {
  try {
    const shipments = await Shipment.find();
    res.json(shipments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Controller method to retrieve a shipment by ID
async function getShipmentById(req, res) {
  try {
    const shipment = await Shipment.findById(req.params.id).populate(
      "shipmentItems"
    );
    if (!shipment) {
      return res.status(404).json({ message: "Shipment not found" });
    }
    res.json(shipment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Controller method to update a shipment
async function updateShipment(req, res) {
  try {
    const { shipmentItems, ...shipmentData } = req.body;

    const updatedShipment = await Shipment.findByIdAndUpdate(
      req.params.id,
      shipmentData,
      { new: true }
    );

    if (!updatedShipment) {
      return res.status(404).json({ message: "Shipment not found" });
    }

    if (shipmentItems && shipmentItems.length > 0) {
      updatedShipment.shipmentItems = shipmentItems;
      await updatedShipment.save();
    }

    res.json(updatedShipment);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
async function getShipmentsByUserId(req, res) {
  try {
    const userId = req.params.userId;

    // Find shipments where the customer_id or receiver_id matches the user ID
    const shipments = await Shipment.find({
      $or: [{ customer_id: userId }, { receiver_id: userId }],
    });

    if (shipments.length === 0) {
      return res.status(404).json({ message: "No shipments found for the provided user ID" });
    }

    res.json(shipments);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Internal server error" });
  }
}

async function updateShipmentStatus(req, res) {
  try {
    const { shipmentId, newStatus } = req.body;

    // Find the shipment by ID
    const shipment = await Shipment.findById(shipmentId);
    if (!shipment) {
      return res.status(404).json({ message: "Shipment not found" });
    }

    // Check if the user is authorized (type === 'employee')
    if (req.user.type !== 'Employee') {
      return res.status(403).json({ message: "Only employees are authorized to update shipment status" });
    }

    // Update the shipment status
    shipment.status = newStatus;
    await shipment.save();

    res.json({ message: "Shipment status updated successfully" });
  } catch (error) {
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
};

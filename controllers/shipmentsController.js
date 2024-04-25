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

module.exports = {
  createShipment,
  getShipments,
  getShipmentById,
  updateShipment,
  deleteShipment,
};

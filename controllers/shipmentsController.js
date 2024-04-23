// controllers/shipmentsController.js
const Shipment = require("../models/shipments");
const ShipmentItem = require("../models/shipmentItem");

// Controller method to create a new shipment
async function createShipment(req, res) {
    try {
      // Extract shipment data from the request body
      const {
        customer_id,
        receiver_id,
        origin,
        destination,
        shipmentDate,
        expectedDeliveryDate,
        status,
        warehouseID,
      } = req.body;
  
      // Find shipment items associated with the customer_id
      const existingShipmentItems = await ShipmentItem.find({ customer_id });
  
      // Check if there are existing shipment items
      if (existingShipmentItems.length === 0) {
        // If there are no shipment items, create them first
        const newShipmentItem = await ShipmentItem.create({
          item_id: req.body.item_id,
          quantity: req.body.quantity,
          customer_id: req.body.customer_id,
        });
  
        // Create the shipment with the new shipment item
        const newShipment = await Shipment.create({
          customer_id,
          receiver_id,
          origin,
          destination,
          shipmentDate,
          expectedDeliveryDate,
          status,
          warehouseID,
          shipmentItemIDs: [newShipmentItem._id], // Use the ID of the newly created shipment item
        });
  
        res.status(201).json(newShipment);
      } else {
        // Filter existing shipment items to check if they have the same customer_id
        const filteredShipmentItems = existingShipmentItems.filter(item => item.customer_id.toString() === customer_id);
  
        if (filteredShipmentItems.length === 0) {
          // If there are no existing shipment items with the same customer_id, create a new one
          const newShipmentItem = await ShipmentItem.create({
            item_id: req.body.item_id,
            quantity: req.body.quantity,
            customer_id: req.body.customer_id,
          });
  
          // Create the shipment with the new shipment item
          const newShipment = await Shipment.create({
            customer_id,
            receiver_id,
            origin,
            destination,
            shipmentDate,
            expectedDeliveryDate,
            status,
            warehouseID,
            shipmentItemIDs: [newShipmentItem._id], // Use the ID of the newly created shipment item
          });
  
          res.status(201).json(newShipment);
        } else {
          // If there are existing shipment items with the same customer_id, use their IDs to create the shipment directly
          const shipmentItemIDs = filteredShipmentItems.map(item => item._id);
  
          // Create the shipment with existing shipment item IDs
          const newShipment = await Shipment.create({
            customer_id,
            receiver_id,
            origin,
            destination,
            shipmentDate,
            expectedDeliveryDate,
            status,
            warehouseID,
            shipmentItemIDs,
          });
  
          res.status(201).json(newShipment);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(400).json({ message: error.message });
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

// controllers/accountController.js
const shipmentItem = require('../models/shipmentItem');
async function createShipmentItem(req, res) {
    try {
        const newShipmentItem = await shipmentItem.create(req.body);
        res.status(201).json(newShipmentItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function getShipmentItems(req, res) {
    try {
        const shipmentItems = await ShipmentItem.find();
        res.json(shipmentItems);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function getShipmentItemById(req, res) {
    try {
        const shipmentItem = await ShipmentItem.findById(req.params.id);
        if (!shipmentItem) {
            return res.status(404).json({ message: 'Shipment item not found' });
        }
        res.json(shipmentItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function updateShipmentItem(req, res) {
    try {
        const updatedShipmentItem = await ShipmentItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedShipmentItem) {
            return res.status(404).json({ message: 'Shipment item not found' });
        }
        res.json(updatedShipmentItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function deleteShipmentItem(req, res) {
    try {
        const deletedShipmentItem = await ShipmentItem.findByIdAndDelete(req.params.id);
        if (!deletedShipmentItem) {
            return res.status(404).json({ message: 'Shipment item not found' });
        }
        res.json({ message: 'Shipment item deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    createShipmentItem,
    getShipmentItems,
    getShipmentItemById,
    updateShipmentItem,
    deleteShipmentItem,
};
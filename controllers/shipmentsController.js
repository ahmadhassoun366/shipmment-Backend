// controllers/accountController.js
const Shipment = require('../models/shipments');

// Controller method to create a new account
async function createShipment(req, res) {
    try {
        const newShipment = await Shipment.create(req.body);
        res.status(201).json(newShipment);
    } catch (error) {
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
        const shipment = await Shipment.findById(req.params.id);
        if (!shipment) {
            return res.status(404).json({ message: 'Shipment not found' });
        }
        res.json(shipment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Controller method to update a shipment
async function updateShipment(req, res) {
    try {
        const updatedShipment = await Shipment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedShipment) {
            return res.status(404).json({ message: 'Shipment not found' });
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
            return res.status(404).json({ message: 'Shipment not found' });
        }
        res.json({ message: 'Shipment deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    createShipment,
    getShipments,
    getShipmentById,
    updateShipment,
    deleteShipment
};
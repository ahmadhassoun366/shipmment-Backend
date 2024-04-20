// controllers/accountController.js
const Warehouse = require('../models/warehouse');

// Controller method to create a new account
async function createWarehouse(req, res) {
    try {
        const newWarehouse = await Warehouse.create(req.body);
        res.status(201).json(newWarehouse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Controller method to retrieve all warehouses
async function getWarehouses(req, res) {
    try {
        const warehouses = await Warehouse.find();
        res.json(warehouses);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Controller method to retrieve a warehouse by ID
async function getWarehouseById(req, res) {
    try {
        const warehouse = await Warehouse.findById(req.params.id);
        if (!warehouse) {
            return res.status(404).json({ message: 'Warehouse not found' });
        }
        res.json(warehouse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Controller method to update a warehouse
async function updateWarehouse(req, res) {
    try {
        const updatedWarehouse = await Warehouse.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedWarehouse) {
            return res.status(404).json({ message: 'Warehouse not found' });
        }
        res.json(updatedWarehouse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Controller method to delete a warehouse
async function deleteWarehouse(req, res) {
    try {
        const deletedWarehouse = await Warehouse.findByIdAndDelete(req.params.id);
        if (!deletedWarehouse) {
            return res.status(404).json({ message: 'Warehouse not found' });
        }
        res.json({ message: 'Warehouse deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    createWarehouse,
    getWarehouses,
    getWarehouseById,
    updateWarehouse,
    deleteWarehouse
};
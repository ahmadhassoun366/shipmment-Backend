// controllers/accountController.js
const Item = require('../models/item');
async function createItem(req, res) {
    try {
        const newItem = await Item.create(req.body);
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Controller method to retrieve all items
async function getItems(req, res) {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Controller method to retrieve a single item by ID
async function getItemById(req, res) {
    const itemId = req.params.id;
    try {
        const item = await Item.findById(itemId);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json(item);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Controller method to update an existing item
async function updateItem(req, res) {
    const itemId = req.params.id;
    try {
        const updatedItem = await Item.findByIdAndUpdate(itemId, req.body, { new: true });
        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Controller method to delete an item
async function deleteItem(req, res) {
    const itemId = req.params.id;
    try {
        const deletedItem = await Item.findByIdAndDelete(itemId);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    createItem,
    getItems,
    getItemById,
    updateItem,
    deleteItem
};
// controllers/accountController.js
const Receipt = require('../models/receipt');

async function createReceipt(req, res) {
    try {
        const newReceipt = await Receipt.create(req.body);
        res.status(201).json(newReceipt);
    } catch (error) {
        res.status(400).json({message: error.message });
    }
}

// Controller method to retrieve all receipts
async function getReceipts(req, res) {
    try {
        const receipts = await Receipt.find();
        res.json(receipts);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Controller method to retrieve a single receipt by ID
async function getReceiptById(req, res) {
    try {
        const receipt = await Receipt.findById(req.params.id);
        if (!receipt) {
            return res.status(404).json({ message: 'Receipt not found' });
        }
        res.json(receipt);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Controller method to update an existing receipt
async function updateReceipt(req, res) {
    try {
        const updatedReceipt = await Receipt.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedReceipt) {
            return res.status(404).json({ message: 'Receipt not found' });
        }
        res.json(updatedReceipt);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Controller method to delete a receipt
async function deleteReceipt(req, res) {
    try {
        const deletedReceipt = await Receipt.findByIdAndDelete(req.params.id);
        if (!deletedReceipt) {
            return res.status(404).json({ message: 'Receipt not found' });
        }
        res.json({ message: 'Receipt deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    createReceipt,
    getReceipts,
    getReceiptById,
    updateReceipt,
    deleteReceipt
};
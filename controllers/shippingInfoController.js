// controllers/accountController.js
const ShippingInfo = require('../models/shipping_info');

// Controller method to create a new account
async function createShippingInfo(req, res) {
    try {
        const newShippingInfo = await ShippingInfo.create(req.body);
        res.status(201).json(newShippingInfo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Other controller methods for reading, updating, and deleting accounts
// Implement methods like getAccounts, getAccountById, updateAccount, deleteAccount, etc.

module.exports = {
    createShippingInfo,
    // Export other controller methods here
};
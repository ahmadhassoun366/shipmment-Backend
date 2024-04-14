// controllers/accountController.js
const shippingCompanies = require('../models/shipping_companies');

// Controller method to create a new account
async function createShippingCompany(req, res) {
    try {
        const newShippingCompanies = await shippingCompanies.create(req.body);
        res.status(201).json(newShippingCompanies);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Other controller methods for reading, updating, and deleting accounts
// Implement methods like getAccounts, getAccountById, updateAccount, deleteAccount, etc.

module.exports = {
    createShippingCompany,
    // Export other controller methods here
};
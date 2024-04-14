// controllers/accountController.js
const Customer = require('../models/account');

// Controller method to retrieve customers of type 'Customer'
async function getCustomers(req, res) {
    try {
        // Retrieve customers of type 'Customer' from the database
        const customers = await Customer.find({ type: 'Customer' });

        // Respond with the list of customers
        res.json(customers);
    } catch (error) {
        // Handle any errors
        res.status(400).json({ message: error.message });
    }
}

// Other controller methods for reading, updating, and deleting customers
// Implement methods like getCustomerById, updateCustomer, deleteCustomer, etc.

module.exports = {
    getCustomers,
    // Export other controller methods here
};

// controllers/accountController.js
const Receiver = require('../models/account');

// Controller method to retrieve customers of type 'Customer'
async function getReceivers(req, res) {
    try {
        // Retrieve customers of type 'Customer' from the database
        const receivers = await Receiver.find({ type: 'Receiver' });

        // Respond with the list of customers
        res.json(receivers);
    } catch (error) {
        // Handle any errors
        res.status(400).json({ message: error.message });
    }
}

// Other controller methods for reading, updating, and deleting customers
// Implement methods like getCustomerById, updateCustomer, Receiver, etc.

module.exports = {
    getReceivers,
    // Export other controller methods here
};

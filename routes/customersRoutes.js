// routes/accountRoutes.js
const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// Route to create a new account
router.get('/getCustomers', customerController.getCustomers);

// Define other routes for reading, updating, deleting accounts
// Example: router.get('/accounts', accountController.getAccounts);

module.exports = router;

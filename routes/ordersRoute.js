// routes/accountRoutes.js
const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');

// Route to create a new account
router.post('/accounts', ordersController.createOrder);

// Define other routes for reading, updating, deleting accounts
// Example: router.get('/accounts', accountController.getAccounts);

module.exports = router;

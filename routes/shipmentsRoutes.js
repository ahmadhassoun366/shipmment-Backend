// routes/accountRoutes.js
const express = require('express');
const router = express.Router();
const shipmentsController = require('../controllers/shipmentsController');

// Route to create a new account
router.post('/createShipment', shipmentsController.createShipment);

// Define other routes for reading, updating, deleting accounts
// Example: router.get('/accounts', accountController.getAccounts);

module.exports = router;

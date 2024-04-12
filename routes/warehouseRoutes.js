// routes/accountRoutes.js
const express = require('express');
const router = express.Router();
const warehouseController = require('../controllers/warehouseController');

// Route to create a new account
router.post('/warehouse', warehouseController.createShipment);

// Define other routes for reading, updating, deleting accounts
// Example: router.get('/accounts', accountController.getAccounts);

module.exports = router;

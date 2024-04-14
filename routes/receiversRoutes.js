// routes/accountRoutes.js
const express = require('express');
const router = express.Router();
const receiverController = require('../controllers/receiverController');

// Route to create a new account
router.get('/getReceivers', receiverController.getReceivers);

// Define other routes for reading, updating, deleting accounts
// Example: router.get('/accounts', accountController.getAccounts);

module.exports = router;

// routes/accountRoutes.js
const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.get('/getCustomers', customerController.getCustomers);

module.exports = router;

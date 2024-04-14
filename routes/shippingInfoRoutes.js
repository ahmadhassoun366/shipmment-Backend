
const express = require('express');
const router = express.Router();
const shippingInfoController = require('../controllers/shippingInfoController');

// Route to create a new account
router.post('/shippingInfo', shippingInfoController.createShippingInfo);


module.exports = router;

// routes/accountRoutes.js
const express = require('express');
const router = express.Router();
const shipmentItemController = require('../controllers/shipmentItemController');

router.post('/createShipmentItem', shipmentItemController.createShipmentItem);
// Get all shipment items
router.get('/getShipmentItems', shipmentItemController.getShipmentItems);

// Get a shipment item by ID
router.get('/getShipmentItem/:id', shipmentItemController.getShipmentItemById);

// Update a shipment item
router.put('/updateShipmentItem/:id', shipmentItemController.updateShipmentItem);

// Delete a shipment item
router.delete('/deleteShipmentItem/:id', shipmentItemController.deleteShipmentItem);

module.exports = router;
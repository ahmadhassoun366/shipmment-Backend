// routes/accountRoutes.js
const express = require("express");
const router = express.Router();
const shipmentsController = require("../controllers/shipmentsController");
const Shipment = require("../models/shipments");
const checkRole = require("../middleware/checkRole");
const authenticate = require('../middleware/authenticate');


// Route to create a new shipment
router.post("/createShipment",authenticate,checkRole('Customer'),shipmentsController.createShipment);

// Route to retrieve all shipments
router.get("/getShipments",authenticate,checkRole('Customer'), shipmentsController.getShipments);

// Route to retrieve a shipment by ID
router.get("/getShipment/:id",authenticate,checkRole('Customer'), shipmentsController.getShipmentById);

// Route to update a shipment
router.put("/updateShipment/:id",authenticate,checkRole('Customer'), shipmentsController.updateShipment);

// Route to delete a shipment
router.delete("/deleteShipment/:id",authenticate,checkRole('Customer'), shipmentsController.deleteShipment);

router.put("/updateStatus", authenticate, checkRole('Employee'), shipmentsController.updateShipmentStatus);

router.get("/getShipmentsByUser/:userId", authenticate, shipmentsController.getShipmentsByUserId);

// Route to confirm receipt and update shipment status (accessible to receivers)
router.put('/confirmReceipt/:id', authenticate, checkRole('Receiver'), async (req, res) => {
  try {
      const shipment = await Shipment.findById(req.params.id);
      if (!shipment) {
          return res.status(404).json({ message: 'Shipment not found' });
      }
      // Check if the receiver is the one who is supposed to confirm
      if (shipment.receiver_id.toString() !== req.user._id.toString()) {
      
          return res.status(403).json({ message: 'You are not authorized to confirm receipt for this shipment' });
      }
      // Update status to 'Received'
      shipment.status = 'Received';
      await shipment.save();
      res.json({ message: 'Shipment receipt confirmed successfully' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

module.exports = router;

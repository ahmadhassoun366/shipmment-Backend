// routes/accountRoutes.js
const express = require("express");
const router = express.Router();
const shipmentsController = require("../controllers/shipmentsController");

// Route to create a new account
router.post("/createShipment", shipmentsController.createShipment);
// Route to retrieve all shipments
router.get("/shipments", shipmentsController.getShipments);

// Route to retrieve a shipment by ID
router.get("/shipments/:id", shipmentsController.getShipmentById);

// Route to update a shipment
router.put("/shipments/:id", shipmentsController.updateShipment);

// Route to delete a shipment
router.delete("/shipments/:id", shipmentsController.deleteShipment);

module.exports = router;

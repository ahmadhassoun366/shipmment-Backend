// routes/accountRoutes.js
const express = require("express");
const router = express.Router();
const shipmentsController = require("../controllers/shipmentsController");

// Route to create a new account
router.post("/createShipment", shipmentsController.createShipment);
// Route to retrieve all shipments
router.get("/getShipments", shipmentsController.getShipments);

// Route to retrieve a shipment by ID
router.get("/getShipment/:id", shipmentsController.getShipmentById);

// Route to update a shipment
router.put("/getShipment/:id", shipmentsController.updateShipment);

// Route to delete a shipment
router.delete("/getShipment/:id", shipmentsController.deleteShipment);

module.exports = router;

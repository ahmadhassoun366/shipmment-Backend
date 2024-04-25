// routes/accountRoutes.js
const express = require("express");
const router = express.Router();
const shipmentsController = require("../controllers/shipmentsController");

// Route to create a new shipment
router.post("/createShipment", shipmentsController.createShipment);

// Route to retrieve all shipments
router.get("/getShipments", shipmentsController.getShipments);

// Route to retrieve a shipment by ID
router.get("/getShipment/:id", shipmentsController.getShipmentById);

// Route to update a shipment
router.put("/updateShipment/:id", shipmentsController.updateShipment);

// Route to delete a shipment
router.delete("/deleteShipment/:id", shipmentsController.deleteShipment);

// Route to confirm receipt and update shipment status (accessible to receivers)
router.put("/confirmReceipt/:id", checkRole("receiver"), async (req, res) => {
  try {
    const shipment = await Shipment.findById(req.params.id);
    if (!shipment) {
      return res.status(404).json({ message: "Shipment not found" });
    }
    // Check if the receiver is the one who is supposed to confirm
    if (shipment.receiver_id.toString() !== req.user._id) {
      return res
        .status(403)
        .json({
          message:
            "You are not authorized to confirm receipt for this shipment",
        });
    }
    // Update status to 'Received'
    shipment.status = "Received";
    await shipment.save();
    res.json({ message: "Shipment receipt confirmed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

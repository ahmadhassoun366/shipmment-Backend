// routes/accountRoutes.js
const express = require("express");
const router = express.Router();
const receiptController = require("../controllers/receiptController");

// Route to create a new account
router.post("/createReceipt", receiptController.createReceipt);

// Route to get all receipts
router.get("/getReceipts", receiptController.getReceipts);

// Route to get a single receipt by ID
router.get("/getReceipt/:id", receiptController.getReceiptById);

// Route to update a receipt
router.put("/updateReceipt/:id", receiptController.updateReceipt);

// Route to delete a receipt
router.delete("/DeleteReceipt/:id", receiptController.deleteReceipt);

module.exports = router;

// routes/accountRoutes.js
const express = require("express");
const router = express.Router();
const receiptController = require("../controllers/receiptController");

// Route to create a new account
router.post("/createReceipt", receiptController.createReceipt);

// Route to get all receipts
router.get("/receipts", receiptController.getReceipts);

// Route to get a single receipt by ID
router.get("/receipts/:id", receiptController.getReceiptById);

// Route to update a receipt
router.put("/receipts/:id", receiptController.updateReceipt);

// Route to delete a receipt
router.delete("/receipts/:id", receiptController.deleteReceipt);

module.exports = router;

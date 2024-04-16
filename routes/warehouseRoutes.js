// routes/accountRoutes.js
const express = require("express");
const router = express.Router();
const warehouseController = require("../controllers/warehouseController");

// Route to create a new account
router.post("/createWarehouse", warehouseController.createWarehouse);

// Route to retrieve all warehouses
router.get("/warehouses", warehouseController.getWarehouses);

// Route to retrieve a warehouse by ID
router.get("/warehouses/:id", warehouseController.getWarehouseById);

// Route to update a warehouse
router.put("/warehouses/:id", warehouseController.updateWarehouse);

// Route to delete a warehouse
router.delete("/warehouses/:id", warehouseController.deleteWarehouse);

module.exports = router;

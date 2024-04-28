// models/shipment.js
const mongoose = require("mongoose");
const shipmentItems = require("./shipmentItem").schema;
// Define the schema for the Shipment model
const shipmentSchema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  receiver_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Receiver",
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  shipmentDate: {
    type: Date,
    required: true,
  },
  expectedDeliveryDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Packaging","On way", "Failed","Received"],
    required: true,
    set: (v) => v.charAt(0).toUpperCase() + v.slice(1).toLowerCase(),
  },
  warehouseID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Warehouse",
    required: true,
  },

  Items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ShipmentItem",
      required: true,
    },
  ],
});

// Create the Shipment model based on the schema
const Shipment = mongoose.model("Shipment", shipmentSchema);

// Export the Shipment model
module.exports = Shipment;

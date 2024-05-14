const mongoose = require("mongoose");

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
    required: false, 
  },
  status: {
    type: String,
    enum: ["Pending", "Packaging","Onway", "Failed","Received"],
    default: "Pending",
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

const Shipment = mongoose.model("Shipment", shipmentSchema);
module.exports = Shipment;

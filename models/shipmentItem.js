const mongoose = require('mongoose');

const shipmentItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  shipmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shipment' },  // Reference to the Shipment model
  isSensitive: { type: Boolean, default: false }
});

const ShipmentItem = mongoose.model('ShipmentItem', shipmentItemSchema);

module.exports = ShipmentItem;

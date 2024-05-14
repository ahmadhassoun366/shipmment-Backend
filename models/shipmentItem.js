const mongoose = require('mongoose');

const shipmentItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  shipmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shipment' },
  isSensitive: { type: Boolean, default: false },
  type: { 
    type: String, 
    required: true,
    enum: ['Electronics', 'Clothing', 'Furniture', 'Pharmaceuticals', 'Food', 'Other'] 
  }
});

const ShipmentItem = mongoose.model('ShipmentItem', shipmentItemSchema);
module.exports = ShipmentItem;

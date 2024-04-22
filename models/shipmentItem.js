// models/shipmentItem.js
const mongoose = require('mongoose');

const shipmentItemSchema = new mongoose.Schema({
   
    item_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
     customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
});

const ShipmentItem = mongoose.model('ShipmentItem', shipmentItemSchema);

module.exports = ShipmentItem;

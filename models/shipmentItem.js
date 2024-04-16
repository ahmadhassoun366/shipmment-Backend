// models/shipmentItem.js
const mongoose = require('mongoose');

const shipmentItemSchema = new mongoose.Schema({
    shipmentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shipment',
        required: true
    },
    itemID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

const ShipmentItem = mongoose.model('ShipmentItem', shipmentItemSchema);

module.exports = ShipmentItem;

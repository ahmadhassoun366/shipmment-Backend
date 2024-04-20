// models/receipt.js
const mongoose = require('mongoose');

const receiptSchema = new mongoose.Schema({
    shipmentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shipment',
        required: true
    },
    dateIssued: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});

const Receipt = mongoose.model('Receipt', receiptSchema);

module.exports = Receipt;

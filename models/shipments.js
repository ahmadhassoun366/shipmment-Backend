const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    tracking_number: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'Completed', 'Failed'], required: true }
});

const Shipment = mongoose.model('Shipment', shipmentSchema);

module.exports = Shipment;
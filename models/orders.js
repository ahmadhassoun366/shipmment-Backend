const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    account_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
    payments_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment', required: true },
    shipments_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Shipment', required: true },
    warehouse_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse', required: true },
    status: { type: String, enum: ['Pending', 'Completed', 'Failed'], required: true }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
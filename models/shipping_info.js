const mongoose = require('mongoose');

const shippingInfoSchema = new mongoose.Schema({
    shipment_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Shipment', required: true },
    shipping_company_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Shipping_companies', required: true },
    status: { type: String, enum: ['Pending', 'Completed', 'Failed'], required: true }
    });

const Account = mongoose.model('shippingInfo', shippingInfoSchema);

module.exports = Account;

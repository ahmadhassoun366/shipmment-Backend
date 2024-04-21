// models/shipment.js
const mongoose = require('mongoose');

// Define the schema for the Shipment model
const shipmentSchema = new mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    receiver_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Receiver',
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    shipmentDate: {
        type: Date,
        required: true
    },
    expectedDeliveryDate: {
        type: Date,
        required: true
    },
    warehouseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Warehouse',
        required: true
    }
    
});//last_update_dby/status

// Create the Shipment model based on the schema
const Shipment = mongoose.model('Shipment', shipmentSchema);

// Export the Shipment model
module.exports = Shipment;

// models/item.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    dimensions: {
        type: String
    },
    value: {
        type: Number,
        required: true
    }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;

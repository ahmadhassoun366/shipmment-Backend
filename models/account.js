const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    type: { type: String, enum: ['Exporter', 'Importer'], required: true }
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;

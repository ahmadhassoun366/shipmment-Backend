const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    AccountID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: function() {
            // Only require AccountID if the account type is 'customer'
            return this.type === 'Customer';
        }
    },
    // Other fields specific to Customer schema
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;

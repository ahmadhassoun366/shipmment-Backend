const mongoose = require('mongoose');

const receiverSchema = new mongoose.Schema({
    AccountID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: function() {
            // Only require AccountID if the account type is 'Receiver'
            return this.type === 'Receiver';
        }
    },
    // Other fields specific to Customer schema
});

const Receiver = mongoose.model('Receiver', receiverSchema);

module.exports = Receiver;

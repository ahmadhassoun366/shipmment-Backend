const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    AccountID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: function() {
            // Only require AccountID if the account type is 'customer'
            return this.type === 'Employee';
        }
    },
    // Other fields specific to Customer schema
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;

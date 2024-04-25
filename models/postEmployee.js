// models/postEmployee.js
const mongoose = require('mongoose');

// Define the schema for the PostEmployee model
const postEmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contact_info: {
        type: String,
        required: true
    }
});

// Create the PostEmployee model based on the schema
const PostEmployee = mongoose.model('PostEmployee', postEmployeeSchema);

// Export the PostEmployee model
module.exports = PostEmployee;

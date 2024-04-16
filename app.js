const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors'); // Import cors package

const app = express();

// Middleware for CORS
app.use(cors());

// Middleware for parsing JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Could not connect to MongoDB', err));

// Define routes
const accountRoutes = require('./routes/accountRoutes.js'); // Import account routes
app.use(accountRoutes); // Use account routes

const customersRoutes = require('./routes/customersRoutes.js'); // Import account routes
app.use(customersRoutes); // Use account routes

const receiversRoutes = require('./routes/receiversRoutes.js'); // Import account routes
app.use(receiversRoutes); // Use account routes

const shipmentsRoutes = require('./routes/shipmentsRoutes.js'); // Import account routes
app.use(shipmentsRoutes); // Use shipment routes

const postEmployee = require('./routes/postEmployee.js'); // Import account routes
app.use(postEmployee); // Use shipment routes

const receiptRoutes = require('./routes/receiptRoutes.js'); // Import account routes
app.use(receiptRoutes); // Use shipment routes

const itemRoutes = require('./routes/itemRoutes.js'); // Import account routes
app.use(itemRoutes); // Use shipment routes

const shipmentItemRoutes = require('./routes/shipmentItemRoutes.js'); // Import account routes
app.use(shipmentItemRoutes); // Use shipment routes

const warehouseRoutes = require('./routes/warehouseRoutes.js'); // Import account routes
app.use(warehouseRoutes); // Use warehouseRoutes routes

// Define a simple route
app.get('/', (req, res) => {
    res.send('Welcome to the Shipping API');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

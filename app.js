const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

// Middleware for CORS
app.use(cors());

// Middleware for parsing JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Define routes
const accountRoutes = require("./routes/accountRoutes.js"); // Import account routes
app.use(accountRoutes); // Use account routes

const customersRoutes = require("./routes/customersRoutes.js"); // Import account routes
app.use(customersRoutes); // Use account routes

const receiversRoutes = require("./routes/receiversRoutes.js"); // Import account routes
app.use(receiversRoutes); // Use account routes

const shipmentsRoutes = require("./routes/shipmentsRoutes.js"); // Import account routes
app.use(shipmentsRoutes); // Use shipment routes

// const postEmployee = require('./routes/postEmployee.js'); // Import account routes
// app.use(postEmployee); // Use shipment routes

const receiptRoutes = require("./routes/receiptRoutes.js"); // Import account routes
app.use(receiptRoutes); // Use shipment routes

const shipmentItemRoutes = require("./routes/shipmentItemRoutes.js"); // Import account routes
app.use(shipmentItemRoutes); // Use shipment routes

const warehouseRoutes = require("./routes/warehouseRoutes.js"); // Import account routes
app.use(warehouseRoutes); // Use warehouseRoutes routes

// Define a simple route
app.get("/", (req, res) => {
  res.send(`
      <h1>Welcome to the Shipping API</h1>
      <p>This API allows for the management of shipments, accounts, and more. Below are the available endpoints:</p>
      <ul>
        <li><strong>GET /</strong> - API documentation (this page).</li>
        <li><strong>POST /signup</strong> - Sign up for a new user account.</li>
        <li><strong>POST /signin</strong> - Sign in to generate a JWT token.</li>
        <li><strong>POST /createShipment</strong> - Create a new shipment. Requires authentication.</li>
        <li><strong>GET /getShipment</strong> - Retrieve a shipment by ID. Requires authentication.</li>
        <li><strong>PUT /updateShipment/:id</strong> - Update an existing shipment. Requires authentication.</li>
        <li><strong>DELETE /deleteShipment/:id</strong> - Delete a shipment. Requires authentication.</li>
        <li><strong>PUT /updateStatus/:id</strong> - Update the status of a shipment. Requires authentication.</li>
        <li><strong>GET /getShipments</strong> - Retrieve shipments based on user ID. Requires authentication.</li>
        <li><strong>PUT /updateExpectedDeliveryDate/:id</strong> - Update expected delivery date of a shipment.</li>
        <li><strong>GET /statistics</strong> - Get shipment statistics.</li>
        <li><strong>GET /shipments/employee-warehouse</strong> - Get shipments by employee warehouse.</li>
        <li><strong>PUT /confirmReceipt/:id</strong> - Confirm receipt of a shipment. Requires authentication and specific roles.</li>
        <li><strong>GET /greet</strong> - A simple greeting method. Pass a name query for a personalized message.</li>
      </ul>
    `);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(express.static("public"));

// A simple get greet method
app.get("/greet", (req, res) => {
  // get the passed query
  const { name } = req.query;
  res.send({ msg: `Welcome ${name}!` });
});

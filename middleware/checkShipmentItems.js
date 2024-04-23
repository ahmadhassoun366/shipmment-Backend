// middleware/checkShipmentItems.js
const ShipmentItem = require('../models/shipmentItem');

async function checkShipmentItems(req, res, next) {
  try {
    // Check if each shipment item belongs to the same customer as the parent Shipment
    const { shipmentItems } = req.body;
    const customerId = req.body.customer_id; // Assuming customer_id is in the request body

    for (const itemId of shipmentItems) {
      const item = await ShipmentItem.findById(itemId);
      if (!item || item.customer_id.toString() !== customerId.toString()) {
        return res.status(400).json({ message: 'Customer have no items yet !' });
      }
    }
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = checkShipmentItems;
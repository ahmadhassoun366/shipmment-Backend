// routes/accountRoutes.js
const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.post('/createItem', itemController.createItem);
// Route to retrieve all items
router.get('/getItems', itemController.getItems);

// Route to retrieve a single item by ID
router.get('/getItem/:id', itemController.getItemById);

// Route to update an existing item
router.put('/updateItem/:id', itemController.updateItem);

// Route to delete an item
router.delete('/deleteItem/:id', itemController.deleteItem);

module.exports = router;

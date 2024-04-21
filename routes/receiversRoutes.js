// routes/accountRoutes.js
const express = require('express');
const router = express.Router();
const receiverController = require('../controllers/receiverController');

router.get('/getReceivers', receiverController.getReceivers);


module.exports = router;

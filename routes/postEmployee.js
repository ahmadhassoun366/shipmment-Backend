// routes/accountRoutes.js
const express = require('express');
const router = express.Router();
const postEmployeeController = require('../controllers/postEmployeeController');

router.post('/createPostEmployee', postEmployeeController.createPostEmployee);


module.exports = router;

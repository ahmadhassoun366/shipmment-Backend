// routes/accountRoutes.js
const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

// Route for user signup (create account)
router.post('/signup', accountController.signup);

// Route for user signin (generate JWT token)
router.post('/signin', accountController.signin);

module.exports = router;

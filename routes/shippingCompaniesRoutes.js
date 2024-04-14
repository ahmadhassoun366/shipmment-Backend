
const express = require('express');
const router = express.Router();
const shippingCompaniesController = require('../controllers/shippingCompaniesController');


router.post('/shippingCompanies', shippingCompaniesController.createShippingCompany);


module.exports = router;

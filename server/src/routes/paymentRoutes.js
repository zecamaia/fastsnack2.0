const express = require('express');
const loginRequired = require('../middlewares/loginRequired');
const PaymentController = require('../controllers/PaymentController');
const router = express.Router();


router.post('/', PaymentController.createCheckoutSession);

module.exports = router;
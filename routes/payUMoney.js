const express = require('express');
const router = express.Router();
const { requireSignin, authMiddleware, adminMiddleware } = require('../controllers/auth');
const { payUMoneyPayment, payUMoneyPaymentResponse } = require('../controllers/payUMoney');

router.post('/payment/payumoney', payUMoneyPayment);
router.post('payment/payumoney/response', payUMoneyPaymentResponse);


module.exports = router;
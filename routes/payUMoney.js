const express = require('express');
const router = express.Router();
const { requireSignin, authMiddleware, adminMiddleware } = require('../controllers/auth');
const { payUMoneyPayment, payUMoneyPaymentResponse, payUMoneyButtons, createPayUMoneyButtons, updatePayUMoneyButtons } = require('../controllers/payUMoney');

router.post('/payment/payumoney', payUMoneyPayment);
router.post('/payment/payumoney/response', payUMoneyPaymentResponse);

router.get('/payment/payumoney/buttons/:name', payUMoneyButtons);
router.put('/payment/payumoney/buttons/:name', updatePayUMoneyButtons);
router.post('/payment/payumoney/buttons', createPayUMoneyButtons);
module.exports = router;
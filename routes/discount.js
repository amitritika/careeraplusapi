const express = require('express');
const router = express.Router();
const { create, list, read, remove, update } = require('../controllers/discount');

// validators
const { runValidation } = require('../validators');
const { discountCreateValidator } = require('../validators/discount');
const { requireSignin, adminMiddleware, authMiddleware } = require('../controllers/auth');

router.post('/discount', runValidation, requireSignin, adminMiddleware, create);
router.put('/discount', requireSignin, authMiddleware, update);
router.get('/discounts', requireSignin, adminMiddleware, list);
router.get('/discount/:slug', read);
router.delete('/discount/:slug', requireSignin, adminMiddleware, remove);

module.exports = router;
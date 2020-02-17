const express = require('express');
const router = express.Router();
const { requireSignin, authMiddleware, adminMiddleware } = require('../controllers/auth');
const { readVisualresume, updateVisualresume } = require('../controllers/visualresume');

router.get('/visualresume', requireSignin, authMiddleware, readVisualresume);
router.put('/visualresume/update', requireSignin, authMiddleware, updateVisualresume);


module.exports = router;
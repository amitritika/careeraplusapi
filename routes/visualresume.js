const express = require('express');
const router = express.Router();
const { requireSignin, authMiddleware, adminMiddleware } = require('../controllers/auth');
const { readVisualresume, updateVisualresume , updateVisualresumeexp, readVisualresumeexp } = require('../controllers/visualresume');

router.get('/visualresume', requireSignin, authMiddleware, readVisualresume);
router.put('/visualresume/update', requireSignin, authMiddleware, updateVisualresume);
router.put('/visualresumeexp', requireSignin, authMiddleware, readVisualresumeexp);
router.put('/visualresumeexp/update', requireSignin, authMiddleware, updateVisualresumeexp);


module.exports = router;
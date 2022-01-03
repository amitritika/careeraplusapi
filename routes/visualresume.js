const express = require('express');
const router = express.Router();
const { requireSignin, authMiddleware, adminMiddleware } = require('../controllers/auth');
const { readVisualresume, updateVisualresume , updateVisualresumeexp, 
       readVisualresumeexp, photo, readVisualresumepro, updateVisualresumepro, contactFormUserProfile } = require('../controllers/visualresume');

router.get('/visualresume', requireSignin, authMiddleware, readVisualresume);
router.put('/visualresume/update', requireSignin, authMiddleware, updateVisualresume);
router.get('/visualresumeexp', requireSignin, authMiddleware, readVisualresumeexp);
router.put('/visualresumeexp/update', requireSignin, authMiddleware, updateVisualresumeexp);
router.get('/visualresumepro', requireSignin, authMiddleware, readVisualresumepro);
router.put('/visualresumepro/update', requireSignin, authMiddleware, updateVisualresumepro);

router.post('/visualresume/user-contact',contactFormUserProfile);


module.exports = router;
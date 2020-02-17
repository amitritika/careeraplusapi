const express = require('express');
const router = express.Router();
const { requireSignin, authMiddleware, adminMiddleware } = require('../controllers/auth');
const { readExamplan, updateExamplan } = require('../controllers/examplan');

router.get('/examplan', requireSignin, authMiddleware, readExamplan);
router.put('/examplan/update', requireSignin, authMiddleware, updateExamplan);


module.exports = router;
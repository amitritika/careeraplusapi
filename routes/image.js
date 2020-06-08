const express = require('express');
const router = express.Router();

// controllers
const { requireSignin, adminMiddleware } = require('../controllers/auth');
const { createMain,  readMain, create, createVisualresume, readVisualresume, createExamplan, readExamplan} = require('../controllers/image');

router.post('/image', requireSignin, adminMiddleware, create);

router.post('/image/main', requireSignin, adminMiddleware, createMain);
router.get('/image/main', readMain);

router.post('/image/visualresume', requireSignin, adminMiddleware, createVisualresume);
router.get('/image/visualresume', readVisualresume);

router.post('/image/examplan', requireSignin, adminMiddleware, createExamplan);
router.get('/image/examplan', readExamplan);

module.exports = router; 
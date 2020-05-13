const express = require('express');
const router = express.Router();
const { requireSignin, authMiddleware, adminMiddleware } = require('../controllers/auth');
const { read, update, photo, profilephoto, updateprofilephoto, readpublic} = require('../controllers/user');

router.get('/user/profile', requireSignin, authMiddleware, read);
router.put('/user/update', requireSignin, authMiddleware, update);
router.get('/user/photo/:username', photo);
router.get('/user/profile-photo/:username', profilephoto);
router.get('/user/public-profile/:username', readpublic);
router.put('/user/update-profile-photo', requireSignin, authMiddleware, updateprofilephoto);
module.exports = router;
const express = require('express');
const router = express.Router();
const { requireSignin, authMiddleware, adminMiddleware } = require('../controllers/auth');
const { listAptitudeTest, listOldAptitudeTest, 
       aptitudeTest, createAptitudeTest, 
       updateAptitudeTest, updateAptitudeTestResponse, removeAptitudeTest } = require('../controllers/test/dailyAptTest');

const { userDailyTestList, updateUserDailyTestList, updateAptitudeTestUser } = require('../controllers/user');

router.get('/dailytest/:test', listAptitudeTest);
// router.post('/dailytest/aptitude', requireSignin, adminMiddleware, listOldAptitudeTest);
router.get('/dailytest/aptitude/:slug', aptitudeTest);
router.post('/dailytest/aptitude',requireSignin, adminMiddleware, createAptitudeTest);
router.put('/dailytest/aptitude/:slug', requireSignin, adminMiddleware, updateAptitudeTest);
// router.post('/dailytest/aptitude/:slug', requireSignin, authMiddleware, updateAptitudeTestResponse);
router.delete('/dailytest/aptitude/:slug', requireSignin, adminMiddleware, removeAptitudeTest);

router.get('/user/dailytest', requireSignin, authMiddleware, userDailyTestList);
router.post('/user/dailytest', requireSignin, authMiddleware, updateUserDailyTestList);
router.post('/user/dailytest/:slug', requireSignin, authMiddleware, updateAptitudeTestUser);

module.exports = router;
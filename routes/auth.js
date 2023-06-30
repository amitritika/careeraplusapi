const express = require("express");
const router = express.Router();

const { signup, signin, signout, requireSignin, forgotPassword, resetPassword, preSignup, 
    googleLogin, googleLoginUpdated, adminMiddleware, adminLogin,adminUserSignin } = require("../controllers/auth");

//Validators
const {runValidation} = require("../validators");
const {userSignupValidator, userSigninValidator, forgotPasswordValidator, resetPasswordValidator } = require("../validators/auth");

router.post('/pre-signup', userSignupValidator, runValidation, preSignup);
router.post('/signup', signup);
router.post("/signin", userSigninValidator, runValidation, signin);
router.get("/signout", signout);
router.put('/forgot-password', forgotPasswordValidator, runValidation, forgotPassword);
router.put('/reset-password', resetPasswordValidator, runValidation, resetPassword);

// google login
router.post('/google-login', googleLogin);
router.post('/google-login-updated', googleLoginUpdated);
router.post('/admin-login', requireSignin, adminMiddleware, runValidation, adminLogin);

//admin login
router.post('/admin-user-login', adminUserSignin);


module.exports = router;
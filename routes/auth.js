const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router();
const authController = require('../controllers/AuthController');
const { authenticate } = require('../middlewares/auth');
const withErrorHandling = require('../middlewares/error');
const utility = require('../utils/mailer');
require('dotenv').config();

const specificLimiter = rateLimit({
    windowMs: .1 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 10 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes'
});

const controllers = {
    signup: withErrorHandling(authController.signup),
    signin: withErrorHandling(authController.signin),
}

router.get('/', specificLimiter, authenticate, authController.verifyUser);

router.post('/verify_google_token', specificLimiter, authController.continueWithGoogle);

router.post('/signup', specificLimiter, controllers.signup);
router.post('/signin', specificLimiter, controllers.signin);

router.post('/send-mail', utility.sendMail);
router.post('/verify-otp', utility.verifyOTP);



module.exports = router;
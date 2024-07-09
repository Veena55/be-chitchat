const express = require('express');
const rateLimit = require('express-rate-limit');
const authRouter = express.Router();
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
    sendMail: withErrorHandling(utility.sendMail),
    verifyOTP: withErrorHandling(utility.verifyOTP),
}

authRouter.get('/', specificLimiter, authenticate, authController.verifyUser);

authRouter.post('/verify_google_token', specificLimiter, authController.continueWithGoogle);

authRouter.post('/signup', specificLimiter, controllers.signup);
authRouter.post('/signin', specificLimiter, controllers.signin);

authRouter.post('/send-mail', controllers.sendMail);
authRouter.post('/verify-otp', controllers.verifyOTP);



module.exports = authRouter;
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
}

authRouter.get('/', specificLimiter, authenticate, authController.verifyUser);

authRouter.post('/verify_google_token', specificLimiter, authController.continueWithGoogle);

authRouter.route('/signup', { name: 'auth.signup' }).post(specificLimiter, controllers.signup);
authRouter.route('/signin', { name: 'auth.signin' }).post(specificLimiter, controllers.signin);

authRouter.post('/send-mail', utility.sendMail);
authRouter.post('/verify-otp', utility.verifyOTP);



module.exports = authRouter;
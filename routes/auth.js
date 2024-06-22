const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router();
const authController = require('../controllers/AuthController');
const { authenticate } = require('../middlewares/auth');

const specificLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 10 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes'
});

router.get('/', specificLimiter, authenticate, authController.verifyUser);

router.post('/verify_google_token', specificLimiter, authController.continueWithGoogle);


module.exports = router;
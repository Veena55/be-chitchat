const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router();
const authController = require('../controllers/AuthController');
const { authenticate } = require('../middlewares/auth');
const withErrorHandling = require('../middlewares/error');
const transporter = require('../utils/mailer');

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

router.post('/send-mail', (req, res) => {
    const { to, subject, text } = req.body;
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text: text,
    }
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            //     const error = new Error;
            //     error.status = 500;
            //     error.message = "Error sending email" + err;
            //     throw error;
            // }
            console.log(err);
            return res.status(500).json({ message: 'Error', err });
        }
        console.log(info);
        return res.status(200).json({ message: 'Email sent successfully', info });
    })
});


module.exports = router;
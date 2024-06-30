const { OAuth2Client } = require('google-auth-library');
const jwtController = require('../controllers/JwtTokenController');
const { verifyGoogleToken } = require('../middlewares/auth');
const { isTokenPresent } = require('../utils/token');
const User = require('../models/User');
const sendMail = require('../utils/mailer');
require('dotenv').config();
const { body, validationResult } = require('express-validator');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const verifyUser = (req, res, next) => {
    return res.send("Verified");
}
const continueWithGoogle = async (req, res) => {
    try {
        const token = isTokenPresent;
        if (token) {
            // Verify the ID token        
            const payload = verifyGoogleToken(req, res);
            const { sub, email, user } = payload;

            // generate JwtToken
            const jwtToken = jwtController.generateJwtToken(payload, process.env.JWT_SECRET_KEY);

            // If the user is verified, return the user data
            return res.status(200).json({ token: jwtToken });
        }
    } catch (error) {
        return res.status(401).json({ "msg": "Invalid Token" });
    }
}

const signup = async (req, res) => {
    // Validation rules & sanitization of the input fields
    await body('name')
        .isString()
        .withMessage("Name filed should be a string.")
        .notEmpty()
        .withMessage("Name filed is required.")
        .trim()
        .escape()
        .run(req);
    await body('email')
        .notEmpty()
        .withMessage("Email filed is required.")
        .isEmail()
        .withMessage("Invalid Email")
        .normalizeEmail()
        .run(req);
    await body('password').notEmpty()
        .withMessage("Password filed is required.")
        .isLength({ min: 5 })
        .withMessage("Password filed should be a minimum of 5 characters.")
        .trim()
        .escape()
        .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    // let responseMail = await sendMail(email);
    // if (responseMail.verfify_otp != null) {

    // }
    const user = await User.create({ name, email, password });
    return res.status(201).json({ "is_email_verified": user.is_email_verified });
}

const signin = async (req, res) => {
    // Validation rules & sanitization of the input fields
    await body('email')
        .notEmpty()
        .withMessage("Email filed is required.")
        .isEmail()
        .withMessage("Invalid Email")
        .normalizeEmail()
        .run(req);
    await body('password')
        .notEmpty()
        .withMessage("Password filed is required.")
        .isLength({ min: 5 })
        .withMessage("Password filed should be a minimum of 5 characters.")
        .trim()
        .escape()
        .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ "msg": "User Not Found" });
    }
    if (!(await user.comparePassword(password))) {
        return res.status(401).json({ "msg": "Invalid Password" });
    }
    const jwtToken = jwtController.generateJwtToken(user.toJSON(), process.env.JWT_SECRET_KEY);
    return res.json({ token: jwtToken });
}



module.exports = {
    verifyUser,
    signup,
    signin,
    continueWithGoogle
}
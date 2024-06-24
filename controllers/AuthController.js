const { OAuth2Client } = require('google-auth-library');
const jwtController = require('../controllers/JwtTokenController');
const { verifyGoogleToken } = require('../middlewares/auth');
const { isTokenPresent } = require('../utils/token');
const User = require('../models/User');
require('dotenv').config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const verifyUser = (req, res, next) => {
    console.log("Hi");
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

const signup = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.create({ name, email, password });
        return res.status(201).json(user);
    } catch (error) {
        next(error);
    }
}



module.exports = {
    verifyUser,
    signup,
    continueWithGoogle
}
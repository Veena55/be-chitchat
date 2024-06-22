const { OAuth2Client } = require('google-auth-library');
const jwtController = require('../controllers/JwtTokenController');
const { verifyGoogleToken } = require('../middlewares/auth');
const { isTokenPresent } = require('../utils/token');
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

const signup = async (req, res) => {
    const { name, email, username, password } = req.body
    // console.log(req.body)
    return res.status(201).json({ name, email, username, password });
}



module.exports = {
    verifyUser,
    signup,
    continueWithGoogle
}
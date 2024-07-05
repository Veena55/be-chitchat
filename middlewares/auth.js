const jwtController = require('../controllers/JwtTokenController');
const { isTokenPresent } = require('../utils/token');

const verifyGoogleToken = async (req, res, token) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        const payload = ticket.getPayload();
        return payload;
    } catch (error) {
        return res.status(401).json({ message: "Invalid Token" });
    }
}


const authenticate = async (req, res, next) => {
    const token = isTokenPresent(req, res);
    if (token) {
        const decodeToken = jwtController.decodeJwtToken(token);
        if (!decodeToken) return res.status(401).json({ message: 'Invalid Token!!' });
        if (decodeToken.header.alg.startsWith('RS')) {
            const payload = await verifyGoogleToken(decodeToken);
            req.user = payload;
            next();
        } else {
            const jwtToken = await jwtController.verifyJwtToken(token);
            if (jwtToken) {
                req.user = jwtToken;
                next();
            }
        }
    }
}



module.exports = {
    authenticate,
    verifyGoogleToken
}
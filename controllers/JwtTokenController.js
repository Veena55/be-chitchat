const jwt = require('jsonwebtoken');
const generateJwtToken = (payload, secretKey) => {
    return jwt.verify(payload, secretKey);
}
const decodeJwtToken = (token) => {
    const decodedHeader = jwt.decode(token, { complete: true });
    return decodedHeader;
}

const verifyJwtToken = (req, res, next) => {
    const result = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = result;
}

module.exports = {
    generateJwtToken,
    decodeJwtToken,
    verifyJwtToken
}
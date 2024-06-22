const jwt = require('jsonwebtoken');
const generateJwtToken = (payload, secretKey) => {
    return jwt.sign(payload, secretKey);
}
const decodeJwtToken = (token) => {
    const decodedHeader = jwt.decode(token, { complete: true });
    return decodedHeader;
}

const verifyJwtToken = (req, res, next) => {
    const result = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return result;
}

module.exports = {
    generateJwtToken,
    decodeJwtToken,
    verifyJwtToken
}
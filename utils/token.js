const isTokenPresent = (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        res.status(401).json({ message: "authorization key not provided" });
        return;
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return;
    }
    return token;
}

module.exports = {
    isTokenPresent
}
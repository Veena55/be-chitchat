const User = require("../models/User")

module.exports = getProfile = async (req, res) => {
    const profile = await User.findById(req.user._id);
    return res.json(profile);
}
const getUser = (req, res) => {
    console.log(req.user._id);
    return res.status(200).json(req.user._id);
}

module.exports = { getUser };
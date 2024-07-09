const Friend = require("../models/Friend");

const getFriends = async (req, res, next) => {
    const searchText = req.body.searchText;
    try {
        const friends = await Friend.find().populate({
            path: 'friend',
            match: { name: { $regex: searchText, $options: "i" } },
            select: 'name'
        });
        const filteredFriends = friends.filter(friend => friend.friend);
        return res.json(filteredFriends);

    } catch (error) {
        next(error);
    }
}
module.exports = { getFriends };
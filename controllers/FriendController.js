
const Friend = require("../models/Friend");

const getFriendsById = async (req, res) => {
    try {
        const friendList = await Friend.find({
            $or: [
                { user: req.user },
                { friend: req.user }
            ]
        });
        if (!friendList || friendList.length === 0) {
            return res.status(404).send("No friends found");
        }

        return res.status(200).json(friendList);
    } catch (error) {
        return res.status(500).json("Inernal Error");
    }
}

const addFreind = async (req, res) => {
    try {
        const friend = await Friend.findOne({
            $and: [
                {
                    $or: [
                        { user: req.body.user },
                        { friend: req.body.user }
                    ]
                },
                {

                    $or: [
                        { user: req.user },
                        { friend: req.user }
                    ]
                }
            ]
        });
        if (friend) {
            res.status(403).json("Already, exists in freind list!!");
        } else {
            const newFriend = new Friend(
                {
                    user: req.user,
                    friend: req.body.user
                }
            );
            await newFriend.save();
            res.status(200).json("Added into friend list");
        }
    } catch (error) {
        return res.status(500).json("Internal Error");
    }
}


module.exports = { getFriendsById, addFreind };
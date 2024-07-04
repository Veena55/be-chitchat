
const Friend = require("../models/Friend");

const getFriendsById = async (req, res) => {
    try {
        const friendList = await Friend.find({
            $or: [
                { user: req.user.id },
                { friend: req.user.id }
            ]
        });
        if (!friendList || friendList.length === 0) {
            return res.status(404).json("No friends found");
        }

        return res.status(200).json(friendList);
    } catch (error) {
        return res.status(500).json("Inernal Error");
    }
}

const addFreind = async (req, res) => {
    try {
        const friend = await Friend.findOne({
            $or: [
                {
                    $and: [
                        { user: req.body.user },
                        { friend: req.user }
                    ]
                },
                {

                    $and: [
                        { user: req.user },
                        { friend: req.body.user }
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

const acceptInvite = async (req, res) => {
    try {
        const response = await Friend.updateOne({ _id: id }, { $set: { accepted: true } });
        if (response.nModified === 1) {
            res.status(200).json("Accepted");
        }

    } catch (error) {
        return res.status(500).json("Internal Error");
    }
}

module.exports = { getFriendsById, addFreind, acceptInvite };
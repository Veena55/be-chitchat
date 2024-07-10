
const Friend = require("../models/Friend");

// const getFriendsById = async (req, res) => {
const all = async (req, res) => {
    const friendList = await Friend.find({
        $or: [
            { user: req.user._id },
            { friend: req.user._id }
        ]
    }).populate('friend', 'name email');
    const populatedFriendList = friendList.map(friend => {
        const isUser = friend.user._id.toString() === req.user._id.toString();
        return {
            ...friend._doc,
            friend: isUser ? friend.friend : friend.user
        };
    });
    // console.log(populatedFriendList);
    return res.status(200).json(populatedFriendList);
}

const addFreind = async (req, res, next) => {
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
            res.status(403).json({ msg: "FRIEND_EXISTS" });
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
        console.log(error);
        next(error);
        // return res.status(500).json("Internal Error");
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

module.exports = { all, addFreind, acceptInvite };
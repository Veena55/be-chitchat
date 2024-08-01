
const Friend = require("../models/Friend");

// const getFriendsById = async (req, res) => {
const all = async (req, res) => {
    const friendData = await Friend.find({ user: req.user._id })
        .populate('friend', 'name email')
        .select('-user');
    const userData = await Friend.find({ friend: req.user._id })
        .populate('user', 'name email')
        .select('-friend');

    const transformedFriendList = friendData.map(item => ({
        _id: item._id,
        user: item.friend,  // Renaming 'friend' to 'contact'
        accepted: item.accepted,
        created_at: item.created_at,
        updated_at: item.updated_at
    }));

    return res.status(200).json([...transformedFriendList, ...userData]);
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
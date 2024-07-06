const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    friend: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    accepted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
});

const Friend = mongoose.model('friend', friendSchema);

module.exports = Friend;
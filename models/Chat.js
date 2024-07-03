const mongoose = require('mongoose');

const chatSchema = new mongoose({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recieverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    msgContent: {
        type: String,
        required: true
    },
    sentAt: {
        type: Date,
        default: Date.now
    },
    readAt: {
        type: Date
    }
});

const Chat = mongoose.model('chat', chatSchema);

module.exports = Chat;
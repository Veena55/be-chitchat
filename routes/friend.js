const express = require('express');
const router = express.Router();
const friendController = require('../controllers/FriendController');

router.get('/all', friendController.getFriendsById);

module.exports = router;

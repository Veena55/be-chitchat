const express = require('express');
const router = express.Router();
const friendController = require('../controllers/FriendController');
const { authenticate } = require('../middlewares/auth');

router.get('/all', authenticate, friendController.getFriendsById);
router.post('/add_friend', authenticate, friendController.addFreind);
router.get('/accept_invite', authenticate, friendController.acceptInvite);

module.exports = router;

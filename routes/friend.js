const express = require('express');
const router = express.Router();
const friendController = require('../controllers/FriendController');
const withErrorHandling = require('../middlewares/error');
// const { authenticate } = require('../middlewares/auth');

router.get('/all', withErrorHandling(friendController.all));
router.post('/add_friend', withErrorHandling(friendController.addFreind));
router.get('/accept_invite', withErrorHandling(friendController.acceptInvite));

module.exports = router;

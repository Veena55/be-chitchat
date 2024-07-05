const express = require('express');
const { authenticate } = require('../middlewares/auth');
const router = express.Router();
const inviteController = require('../controllers/InviteController');

router.get('/user', authenticate, inviteController.getUser);

module.exports = router;
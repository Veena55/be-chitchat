const express = require('express');
const { authenticate } = require('../middlewares/auth');
const router = express.Router();
const searchController = require('../controllers/SearchController');

router.post('/friends', authenticate, searchController.getFriends);

module.exports = router;
const express = require('express');
const router = express.Router();
const userController = require("../controllers/UserController");
const withErrorHandling = require('../middlewares/error');



router.get('/profile', withErrorHandling(userController));

module.exports = router;
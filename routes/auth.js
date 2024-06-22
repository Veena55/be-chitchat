const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');

router.get('/', authController.verifyUser);
router.post('/verify_google_token', authController.verifyGoogleToken);
router.post('/signup', authController.signup);


module.exports = router;
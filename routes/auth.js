const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');
const { authenticate } = require('../middlewares/auth');

router.get('/', authenticate, authController.verifyUser);

router.post('/verify_google_token', authController.continueWithGoogle);


module.exports = router;
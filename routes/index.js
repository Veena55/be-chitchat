
const express = require('express');
const app = express();
const authRouter = require('./auth');
const friendRoute = require('./friend');
const inviteRoute = require('./invite');
const searchRoute = require('./search');
const userRoute = require('./user');

const router = express.Router();

router.get('/', (req, res) => {
    return res.send("Welcome to Chit-Chat Server!!");
});

router.use('/auth', authRouter);
router.use('/friend', friendRoute);
router.use('/invite', inviteRoute);
router.use('/search', searchRoute);
router.use('/user', userRoute);

module.exports = router
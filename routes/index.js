
const express = require('express');
const app = express();
const authRouter = require('./auth');
const friendRoute = require('./friend');
const inviteRoute = require('./invite');
const searchRoute = require('./search');

const router = express.Router();

router.get('/', (req, res) => {
    return res.send("Welcome to Chit-Chat Server!!");
});

router.use('/auth', authRouter);
app.use('/friend', friendRoute);
app.use('/invite', inviteRoute);
app.use('/search', searchRoute);

module.exports = router
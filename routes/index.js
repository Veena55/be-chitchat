
const express = require('express');
const app = express();
const authRouter = require('./auth');
const friendRoute = require('./friend');

const router = express.Router();

router.get('/', (req, res) => {
    return res.send("Welcome to Chit-Chat Server!!");
});

router.use('/auth', authRouter);
app.use('/friend', friendRoute);

module.exports = router
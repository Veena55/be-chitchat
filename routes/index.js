
const express = require('express');
const app = express();
const authRouter = require('./auth');

const router = express.Router();

router.get('/', (req, res) => {
    return res.send("Welcome to Chit-Chat Server!!");
});

router.use('/auth', authRouter);

module.exports = router
const express = require('express');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');

const app = express();

app.get('/', (req, res) => {
    return res.send("Welcome to Chit-Chat Server!!");
});

app.use('/auth', authRoute);

app.listen(7000, (err) => {
    if (err) {
        console.log("Can't listen to the port!!");
    }
    console.log("Server is running on port 7000");
});
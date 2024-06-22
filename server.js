const express = require('express');
const mongoose = require('mongoose');
const route = require('./routes/auth');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    return res.send("Welcome to Chit-Chat Server!!");
});

app.use('/auth', route);

// Handle invalid URLs
app.use('', (req, res) => res.json({ message: 'Invalid URL' }));

app.listen(5000, (err) => {
    if (err) {
        console.log("Can't listen to the port!!");
    }
    console.log("Server is running on port 5000");
});
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require("cookie-parser");
const nodemailer = require('nodemailer');
const cors = require('cors');
const authRoute = require('./routes/auth');
require('./config/db');

const app = express();

app.use(express.json());

// app.use(cookieParser());

app.use(session({
    secret: 'chit-chat-key',
    resave: true,
    saveUninitialized: true,
    // cookie: { secure: false }
}))

app.use(cors({
    origin: 'http://localhost:5173', // Allow your frontend's origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

app.get('/', (req, res) => {
    return res.send("Welcome to Chit-Chat Server!!");
});

app.use(cors({
    origin: "http://localhost:5173",
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}));

app.use('/auth', authRoute);

// Create transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    // auth:{
    //     user: 
    // }
})


// Handle invalid URLs
app.use('', (req, res, next) => {
    const error = new Error();
    error.status = 404
    error.message = "Not Found";
    next(error);
});

// A middleware to handle errors for application level.
app.use((error, req, res, next) => {
    console.log(error);
    error.c_msg = 'Something went Wrong';
    if (error.status && 99 < error.status < 600)
        return res.status(error.status).json({ ...error });
    return res.status(400).json({ ...error });
});

app.listen(7000, (err) => {
    if (err) {
        console.log("Can't listen to the port!!");
    }
    console.log("Server is running on port 7000");
});
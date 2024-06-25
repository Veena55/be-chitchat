const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const authRoute = require('./routes/auth');
require('./config/db');

const app = express();

app.use(express.json());

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
app.use('', (req, res) => res.json({ message: 'Invalid URL' }));

app.listen(7000, (err) => {
    if (err) {
        console.log("Can't listen to the port!!");
    }
    console.log("Server is running on port 7000");
});
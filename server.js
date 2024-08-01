const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require("cookie-parser");
const cors = require('cors');
const { authenticate } = require('./middlewares/auth');
require('./config/db');
require('dotenv').config();
const socketIo = require('socket.io');
const router = require('./routes/index');
const http = require('http');
const { verifyJwtToken } = require('./controllers/JwtTokenController');

// Create an Express application
const app = express();

// Create an HTTP server and pass the Express app to it
const server = http.createServer(app);

// Attach Socket.io to the HTTP server
const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:5173', // Allow your frontend's origin
        methods: ['GET', 'POST'],
        credentials: true
    }
});

app.use(express.json());

// app.use(cookieParser());

app.use(session({
    secret: process.env.APPNAME,
    resave: true,
    saveUninitialized: true,
    // cookie: { secure: false }
}))

app.use(cors({
    origin: 'http://localhost:5173', // Allow your frontend's origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

app.use('/', authenticate, router);

// Handle invalid URLs
app.use('', (req, res, next) => {
    const error = new Error();
    error.status = 404
    error.message = "INVALID_URL";
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

io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (token) {
        const user = verifyJwtToken(token);
        socket.id = user._id;
        console.log(socket.id, "manual");
    }
    next();
})

io.on('connection', (socket) => {
    console.log('New client connected', socket.id);


    socket.on('sendMessage', ({ to, message }) => {
        console.log("send", { sender: socket.id, to, message });
        io.to(to).emit('receiveMessage', { sender: socket.id, message });
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    })
});

server.listen(7000, (err) => {
    if (err) {
        console.log("Can't listen to the port!!");
    }
    console.log("Server is running on port 7000");
});
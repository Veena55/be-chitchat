const mongoose = require('mongoose');
require('dotenv').config();

const db = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connection built with DB successfully!!");
    } catch (err) {
        console.log("Error connecting to the database:", err);
    }
}
db();

module.exports = mongoose.connection;
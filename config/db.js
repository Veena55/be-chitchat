const mongoose = require('mongoose');
require('dotenv').config();

const db = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log("Connection built with DB successfully!!");
    } catch (err) {
        console.error("Error connecting to the database:", error);
    }
}
db();

module.exports = mongoose.connection;
const mongoose = require('mongoose');

const conn = mongoose.connect(process.env.MONGO_db);

module.exports = conn;
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
        unique: [true, 'This username already exists!'],
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        unique: [true, 'This email already exists!'],
    },
    password: String,
    created_at: { type: Date, default: Date.now() }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
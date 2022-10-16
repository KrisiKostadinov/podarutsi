const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        required: [true, 'Email is required!'],
        unique: [true, 'This email already exists!'],
    },
    password: {
        type: String,
        required: [true, 'The password is required.'],
        minLength: [6, 'The password must be minimum 6 symbols.']
    },
    role: {
        type: String,
        default: 'user'
    }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;
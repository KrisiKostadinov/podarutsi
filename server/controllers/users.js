const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const User = require('../models/User');

const login = asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        res.statusCode = 403;
        throw new Error('Wrong email or password.');
    }

    const comparePassowrd = await bcrypt.compare(password, user.password);
    if (!comparePassowrd) {
        throw new Error('Wrong email or password.');
    }

    const token = jwt.sign({ role: user.role, email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });

});

const register = asyncHandler(async (req, res) => {

    const { email, password, firstName, lastName } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = new User({ firstName, lastName, password: hashPassword, email, });

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.statusCode = 403;
        throw new Error('This email already exists!');
    }

    if (password?.length < 6) {
        throw new Error('The password must contains more then 6 symbols.');
    }

    await user.save();
    res.json({ _id: user._id, role: user.role, firstName, lastName, email });

});

const getItem = async (req, res) => {

    const user = await User.findOne({ email: req.user.email });

    if (!user) throw new Error('This user does not exists!');

    res.json({
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        email: user.email,
    });

}

const getItems = async (req, res) => {
    const users = await User.aggregate(
        [
            {
                $project: {
                    firstName: '$firstName',
                    lastName: '$lastName',
                    createdAt: '$createdAt',
                    updatedAt: '$updatedAt',
                    role: '$role',
                    email: '$email',
                }
            }
        ]
    );
    res.json(users);
}

module.exports = {
    getItem,
    getItems,
    register,
    login,
}
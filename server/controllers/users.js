const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const login = async (req, res) => {

    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if(!user) return res.send({ message: 'Wrong username or password.' });
    
    const comparePassowrd = await bcrypt.compare(password, user.password);
    if(!comparePassowrd) return res.send({ message: 'Wrong username or password.' });
    
    const token = jwt.sign({ username, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });

}

const register = async (req, res) => {

    const { username, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = new User({
        username,
        password: hashPassword,
        email
    });

    try {
        await user.save();
    } catch (error) {
        return res.status(403).send(error);
    }
    
    res.json({
        _id: user._id,
        username,
        email
    });
    
}

module.exports = {
    register,
    login,
}
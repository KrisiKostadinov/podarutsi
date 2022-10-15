const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) return res.status(403).send({ message: 'User is not authenticated' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).send({ message: 'User is not authenticated' });
        console.log(decoded);
    });

    next();
}

module.exports = {
    verifyUser,
}
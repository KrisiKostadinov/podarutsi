const { verify } = require('../utils/users');

const verifyUser = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        res.statusCode = 403;
        throw new Error('This user is not authenticated!');
    }

    const user = verify(token);
    if (!user) {
        res.statusCode = 403;
        throw new Error('This user is not authorized!');
    }

    req.user = user;

    next();
}

const isAdmin = (req, res, next) => {

    const token = req.headers.authorization;
    const user = verify(token);
    if (user.role != 'admin') {
        throw new Error('This user don\'t permission!');
    }

    next();
}

const errorHandler = (err, req, res, next) => {

    const status = res.statusCode || 500;
    res
        .status(status)
        .json({
            passed: false,
            message: err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : null
        });

}

module.exports = {
    verifyUser,
    isAdmin,
    errorHandler
}
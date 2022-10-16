const jwt = require('jsonwebtoken');

const verify = (token) => {

    return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return false;

        return decoded;
    });

}
module.exports = {
    verify,
}
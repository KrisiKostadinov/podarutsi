const express = require('express');
const router = express.Router();
const { verifyUser } = require('../config/middlewares');

router.get('/', (req, res) => {
    res.send('home');
});
router.get('/about', verifyUser, (req, res) => {
    res.send('about');
});

module.exports = router;
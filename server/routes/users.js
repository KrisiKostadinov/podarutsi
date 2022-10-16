const express = require('express');
const router = express.Router();
const { verifyUser, isAdmin } = require('../config/middlewares');

const { getItem, getItems, login, register } = require('../controllers/users');

router.get('/', verifyUser, getItem);
router.get('/all', verifyUser, isAdmin, getItems);
router.post('/login', login);
router.post('/register', register);

module.exports = router;
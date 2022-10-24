const express = require('express');
const router = express.Router();
const { verifyUser, isAdmin } = require('../config/middlewares');

const { getItem, addItem, getItems, deleteItem } = require('../controllers/categories');

router.get('/:id', getItem);
router.get('/', getItems);

router.post('/', verifyUser, isAdmin, addItem);

router.delete('/:id', verifyUser, isAdmin, deleteItem);

module.exports = router;
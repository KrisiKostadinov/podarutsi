const express = require('express');
const router = express.Router();
const { verifyUser, isAdmin } = require('../config/middlewares');

const { getItem, createAndUpdateItem, getItems, getByCategory, deleteItem, changeCategory } = require('../controllers/products');

router.get('/', getItems);
router.get('/:id?', getItem);
router.get('/in_category/:id', getByCategory);

router.post('/:id', verifyUser, isAdmin, createAndUpdateItem);
router.post('/:curr_cat/:next_cat', verifyUser, isAdmin, changeCategory);

router.delete('/:id', verifyUser, isAdmin, deleteItem);

module.exports = router;
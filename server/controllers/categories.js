const asyncHandler = require('express-async-handler');
const Category = require('../models/Category');

const addItem = asyncHandler(async (req, res) => {

    const categoryExists = await Category.findOne({ title: req.body.title });

    if(categoryExists) {
        res.statusCode = 403;
        throw new Error('This category title already exists!');
    }

    const category = await Category.create(req.body);
    res.status(201).json({ ...category._doc, passed: true });
    
});

const getItem = asyncHandler(async (req, res) => {

    const id = req.params.id;
    const category = await Category.findById({ _id: id }).populate('products');

    if(!category) {
        res.statusCode = 404;
        throw new Error('This category doen\'t exists!');
    }
    res.json(category);

});

const getItems = asyncHandler(async (req, res) => {

    const categories = await Category.find();
    res.json(categories);

});

const deleteItem = asyncHandler(async (req, res) => {

    const id = req.params.id;
    const category = await Category.findById(id);
    
    if(!category) {
        res.statusCode = 404;
        throw new Error('This category doesn\'t exists!');
    }
    await category.delete();
    res.json({ passed: true });

});

module.exports = {
    addItem,
    getItem,
    getItems,
    deleteItem,
}
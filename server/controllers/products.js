const asyncHandler = require('express-async-handler');
const Product = require("../models/Product");
const Category = require("../models/Category");

const createAndUpdateItem = asyncHandler(async (req, res) => {

    const id = req.params.id;
    let product = {};

    if (!id) product = await Product.create(req.body);
    else product = await Product.findByIdAndUpdate(id, req.body);

    if (product._doc.category)
        await Category.findByIdAndUpdate(product._doc.category, {
            $push: { products: product._doc._id }
        });
        
    res.json(product._doc);

});

const getItem = asyncHandler(async (req, res) => {

    const id = req.params.id;
    const product = await Product.findById(id).populate('category');

    if (!product) {
        res.statusCode = 404;
        throw new Error('This product doesn\'t exists!');
    }
    res.json(product);

});

const getItems = asyncHandler(async (req, res) => {

    const products = await Product.find();
    res.json(products);

});

const getByCategory = asyncHandler(async (req, res) => {

    const id = req.params.id;
    const products = await Product.find({ category: id });
    res.json(products);

});

const deleteItem = asyncHandler(async (req, res) => {

    const id = req.params.id;
    const product = await Product.findById(id);

    if (!product) {
        res.statusCode = 404;
        throw new Error('This product doesn\'t exists!');
    }
    await product.delete();
    res.json({ passed: true });

});

const changeCategory = asyncHandler(async (req, res) => {

    const { curr_cat, next_cat } = req.params;

    await Product.updateMany({
        "category": curr_cat
    },
        {
            "$set": {
                "category": next_cat
            }
        });

    const currentCategory = await Category.findById(curr_cat);
    const nextCategory = await Category.findById(next_cat);

    currentCategory.products.forEach(p => {
        nextCategory.products.push(p);
    });
    currentCategory.products = [];

    await nextCategory.save();
    await currentCategory.save();

    res.json({ passed: true });

});

module.exports = {
    createAndUpdateItem,
    getItem,
    getItems,
    getByCategory,
    deleteItem,
    changeCategory
}
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: String,
    shirtDesc: String,
    desc: String,
    price: Number,
    sizes: Array,
    promotionPrice: Number,
    colors: Array,
    priviewImage: String,
    images: Array,
    category: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Category'
    },
    options: Object
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
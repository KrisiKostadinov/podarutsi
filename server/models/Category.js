const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'The title is required!'],
        unique: [true, 'Dublicate title!']
    },
    desc: String,
    products: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Product'
        }
    ]
}, { timestamps: true });

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
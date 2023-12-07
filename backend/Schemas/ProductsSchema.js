const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
    id: Number,
    name: String,
    image: String,
    price: Number,
    cuisine: String,
    minQuantity: Number,
    maxQuantity: Number,
    ingredients: [
        {
            name: String,
            quantity: Number,
            isEditable: Boolean,
            minQuantity: Number,
            maxQuantity: Number
        }
    ]
});

const ProductsModel = mongoose.model('products', productsSchema);

module.exports = ProductsModel;
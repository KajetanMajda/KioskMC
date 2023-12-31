const express = require("express");
const router = express.Router();
const ProductsModel = require('../Schemas/ProductsSchema');

router.get('/edit/:name', async (req, res) => {
    const productName = req.params.name;

    try {
        const product = await ProductsModel.findOne({ name: productName }, '-id -image -cuisine -_id -ingredients._id');
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error('Error retrieving product data:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
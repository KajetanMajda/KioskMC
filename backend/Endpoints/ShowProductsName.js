const express = require("express");
const router = express.Router();
const ProductsModel = require('../Schemas/ProductsSchema');

router.get('/products/:name', async (req, res) => {
    const productName = req.params.name;

    try {
        const product = await ProductsModel.findOne({ name: productName }, 'name price image cuisine -_id');
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
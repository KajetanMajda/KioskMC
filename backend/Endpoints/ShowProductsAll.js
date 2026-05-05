const express = require('express');
const router = express.Router();
const ProductsModel = require('../Schemas/ProductsSchema');

router.get('/productsAll', async (req, res) => {
    try {
        const documents = await ProductsModel.find({}, '-_id');
        res.json(documents);
    } catch (error) {
        console.error('Error retrieving data from collection:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const KioskProductsModel = require('../Schemas/ProductsSchema');
const cors = require('cors');

router.use(cors());

router.get('/products', async (req, res) => {
    try {
        const documents = await KioskProductsModel.find({}, 'name price image cuisine -_id');
        res.json(documents);
    } catch (error) {
        console.error('Error retrieving data from collection:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
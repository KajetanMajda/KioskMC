const express = require('express');
const router = express.Router();
const OrderModel = require('../Schemas/OrderSchema');
const cors = require('cors');

router.use(cors());

router.get('/orders/info', async (req, res) => {
    try {
        const documents = await OrderModel.find({}, '-__v -_id -items._id');
        res.json(documents);
    } catch (error) {
        console.error('Error retrieving data from collection:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
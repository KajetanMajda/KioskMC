const express = require('express');
const cors = require('cors');
const OrderModel = require('../Schemas/OrderSchema');
const router = express.Router();

router.use(cors());
router.use(express.json());

router.post('/orders', async (req, res) => {
    try {
        const { orderNumber, total, date, items } = req.body;

        const newOrder = new OrderModel({
            orderNumber,
            total,
            date,
            items
        });

        await newOrder.save();
        res.status(201).json({ message: 'Order created successfully' });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
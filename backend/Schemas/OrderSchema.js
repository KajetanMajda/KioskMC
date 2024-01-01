const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderNumber: Number,
  total: Number,
  date: String,
  items: [
    {
      name: String,
      quantity: Number,
      price: Number
    }
  ]
});

const OrderModel = mongoose.model("orders", orderSchema);

module.exports = OrderModel;

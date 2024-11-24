const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: String,
    totalPrice: Number,
    lineItems: Array,
    createdAt: Date,
    updatedAt: Date,
});

module.exports = mongoose.model('Order', orderSchema);
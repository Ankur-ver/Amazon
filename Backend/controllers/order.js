require('dotenv').config();
const axios = require('axios');
const mongoose = require('mongoose');
const Order = require('../models/Order');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('monngodb connect'))
    .catch(err => console.error('error:', err));

async function order() {
    const url = `https://${process.env.SHOPIFY_STORE}/admin/api/2024-10/orders.json`;
    const headers = {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN,
    };

    try {
        const response = await axios.get(url, { headers });
        const orders = response.data.orders;
        console.log("response",response);
        for (const order of orders) {
            const newOrder = new Order({
                orderId: order.id,
                totalPrice: order.total_price,
                lineItems: order.line_items,
                createdAt: order.created_at,
                updatedAt: order.updated_at,
            });

            await newOrder.save();
            console.log(`Order ${order.id} saved to database.`);
        }
    } catch (error) {
        console.log("error bye;")
        console.error('Error fetching orders:', error.response ? error.response.data : error.message);
    }
}

module.exports= order;
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3002;

app.use(express.json());

// Sample order data
let orders = [];

// Create a new order
app.post('/orders', async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        // Fetch product details from the Products service
        const productResponse = await axios.get(`http://localhost:3001/products/${productId}`);
        const product = productResponse.data;

        // Calculate total price
        const totalPrice = product.price * quantity;

        // Create the order
        const order = {
            id: orders.length + 1,
            productId,
            quantity,
            totalPrice,
        };

        orders.push(order);
        res.status(201).json(order);
    } catch (error) {
        res.status(404).json({ message: 'Product not found' });
    }
});

// Get all orders
app.get('/orders', (req, res) => {
    res.json(orders);
});

app.listen(PORT, () => {
    console.log(`Orders service running on http://localhost:${PORT}`);
});

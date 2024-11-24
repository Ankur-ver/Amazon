// OrdersList.js
import React, { useEffect, useState } from 'react';

const order = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:3000/orders');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Fetched Orders</h1>
            <ul>
                {orders.map(order => (
                    <li key={order.orderId}>
                        <strong>Order ID:</strong> {order.orderId} <br />
                        <strong>Total Price:</strong> ${order.totalPrice} <br />
                        <strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()} <br />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default order;
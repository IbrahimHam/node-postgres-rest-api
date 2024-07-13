const db = require('../db/client');

const getOrders = async (req, res) => {
    try {
        const result = await db.query(`SELECT * FROM orders`)
        if (!result.rows.length) {
            return res.status(404).json({ error: 'Orders not found!' })
        }
        return res.json(result.rows)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const getOrderById = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await db.query("SELECT * FROM orders WHERE id = $1", [id])
        if (!result.rows.length) {
            return res.status(404).json({ error: "Order not found!" })
        }
        return res.status(201).send(result.rows)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const createOrder = async (req, res) => {
    const { price, date, user_id } = req.body;

    try {
        const result = await db.query("INSERT INTO orders (price,date,user_id) VALUES ($1, $2, $3) RETURNING *", [price, date, user_id])
        return res.status(201).send(result.rows)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const updateOrderById = async (req, res) => {
    const id = req.params.id;
    const { price, date, user_id } = req.body;
    try {
        const result = await db.query("UPDATE orders SET price = $1, date = $2, user_id = $3 WHERE id = $4 RETURNING *", [price, date, user_id, id])
        if (result.rows.length === 0) {
            return res.status(404).send('Order not found');
        }
        res.send(result.rows)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const deleteOrder = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await db.query("DELETE FROM orders WHERE id = $1 RETURNING *", [id]);
        if (result.rows.length === 0) {
            return res.status(404).send('Order not found');
        }
        res.send({success: 'Order was deleted'})
    } catch (error) {
        res.status(500).send(error.message)
    }
}


module.exports = { getOrders, getOrderById, createOrder, updateOrderById, deleteOrder }
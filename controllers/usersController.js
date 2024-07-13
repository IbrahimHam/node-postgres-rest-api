const db = require('../db/client');

const getUsers = async (req, res) => {
    try {
        const result = await db.query(`SELECT * FROM users`)
        if (!result.rows.length) {
            return res.status(404).json({ error: 'Users not found!' })
        }
        return res.json(result.rows)

    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getUserById = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await db.query("SELECT * FROM users WHERE id = $1", [id])
        if (result.rows.length === 0) {
            return res.status(404).send('User not found');
        }
        return res.send(result.rows)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const createUser = async (req, res) => {
    const { first_name, last_name, age } = req.body;
    try {
        result = await db.query("INSERT INTO users (first_name, last_name, age) VALUES ($1 , $2, $3) RETURNING *", [first_name, last_name, age])
        res.send(result.rows)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const updateUserById = async (req, res) => {
    const id = req.params.id;
    const { first_name, last_name, age } = req.body;
    try {
        const result = await db.query("UPDATE users SET first_name = $1, last_name = $2, age = $3 WHERE id = $4 RETURNING *", [first_name, last_name, age, id]);
        if (result.rows.length === 0) {
            return res.status(404).send('User not found');
        }
        res.send(result.rows)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await db.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
        if (result.rows.length === 0) {
            return res.status(404).send('User not found');
        }
        res.send({ success: 'User was deleted' })
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getOrdersByUserId = async (req, res) => {
    const userId = req.params.id;
    try {
        const result = await db.query(`
            SELECT u.id as user_id, u.first_name, u.last_name, o.id AS order_id, o.price 
            FROM users AS u
            LEFT JOIN orders AS o
            ON u.id = o.user_id
            WHERE u.id = $1`, [userId])
        if (result.rows.length === 0) {
            return res.status(404).send('User not found');
        }
        res.send(result.rows)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const updateUserToInactive = async (req, res) => {
    const id = req.params.id;

    try {
        const orderCheckResult = await db.query(
            'SELECT COUNT(*) AS order_count FROM orders WHERE user_id = $1',
            [id]
        );

        const orderCount = parseInt(orderCheckResult.rows[0].order_count, 10);

        if (orderCount !== 0) {
            return res.send('User has existing orders, not setting inactive');
        }

        const updateResult = await db.query(
            'UPDATE users SET active = FALSE WHERE id = $1 RETURNING *',
            [id]
        );

        if (updateResult.rows.length === 0) {
            return res.status(404).send('User not found');
        }

        return res.json(updateResult.rows);

    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = { getUsers, getUserById, createUser, updateUserById, deleteUser, getOrdersByUserId, updateUserToInactive }
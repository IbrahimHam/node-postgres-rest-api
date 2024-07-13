const db = require('../db/client');

const getUsers = async (req, res) => {
    try {
        const result = await db.query(`SELECT * FROM users`)
        if (!result.rows.length) {
            return res.status(404).json({ error: 'Users not found!' })
        }
        return res.json(result.rows)

    } catch (err) {
        return res.status(500).send(err.message);
    }
}

const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await db.query("SELECT * FROM users WHERE id = $1", [id])
        if (result.rows.length === 0) {
            return res.status(404).send('User not found');
        }
        res.send(result.rows)
    } catch (error) {
        return res.status(500).send(err.message);
    }
}

const createUser = async (req, res) => {
    try {
        const { first_name, last_name, age } = req.body;
        result = await db.query("INSERT INTO users (first_name, last_name, age) VALUES ($1 , $2, $3) RETURNING *", [first_name, last_name, age])
        res.send(result.rows)
    } catch (error) {
        return res.status(500).send(err.message);
    }
}

const updateUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const { first_name, last_name, age } = req.body;
        const result = await db.query("UPDATE users SET first_name = $1, last_name = $2, age = $3 WHERE id = $4 RETURNING *", [first_name, last_name, age, id]);
        if (result.rows.length === 0) {
            return res.status(404).send('User not found');
        }
        res.send(result.rows)
    } catch (error) {
        return res.status(500).send(err.message);
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await db.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
        if (result.rows.length === 0) {
            return res.status(404).send('User not found');
        }
        res.send(result.rows)
    } catch (error) {
        return res.status(500).send(err.message);
    }
}

module.exports = { getUsers, getUserById, createUser, updateUserById, deleteUser }
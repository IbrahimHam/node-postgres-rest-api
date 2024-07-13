const express = require('express');
const { getUsers, getUserById, createUser, updateUserById, deleteUser } = require('../controllers/usersController');
const router = express.Router();

// Get All users
router.get('/', getUsers)

router.get('/:id', getUserById)

router.post('/', createUser)

router.put('/:id', updateUserById)

router.delete('/:id', deleteUser)

module.exports = router;

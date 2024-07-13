const express = require('express');
const router = express.Router();
const { getUsers, getUserById, createUser, updateUserById, deleteUser} = require('../controllers/usersController');

router.get('/', getUsers)

router.get('/:id', getUserById)

router.post('/', createUser)

router.put('/:id', updateUserById)

router.delete('/:id', deleteUser)

module.exports = router;

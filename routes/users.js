const express = require('express');
const router = express.Router();
const { getUsers, getUserById, createUser, updateUserById, deleteUser, getOrdersByUserId,updateUserToInactive } = require('../controllers/usersController');

router.get('/', getUsers)

router.get('/:id', getUserById)

router.post('/', createUser)

router.put('/:id', updateUserById)

router.delete('/:id', deleteUser)

router.get('/:id/orders', getOrdersByUserId)

router.put('/:id/check_inactive', updateUserToInactive)

module.exports = router;

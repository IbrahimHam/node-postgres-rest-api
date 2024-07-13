const express = require('express');
const router = express.Router();
const { getOrders, getOrderById, createOrder, updateOrderById, deleteOrder } = require("../controllers/orderController")

router.get('/', getOrders)

router.get('/:id', getOrderById)

router.post('/', createOrder)

router.put('/:id', updateOrderById)

router.delete('/:id', deleteOrder)

module.exports = router;
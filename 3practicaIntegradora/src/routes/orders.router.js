const {Router } = require('express')
const { 
    getOrders, 
    getOrder, 
    createOrder, 
    updateOrder, 
    deleteOrder 
} = require('../controllers/orders.controller')

const router = Router()

router
    .get('/', getOrders)
    .get('/:oid', getOrder)
    .post('/', createOrder)
    .put('/:oid', updateOrder)
    .delete('/:oid',deleteOrder)

module.exports = router

const { Router } = require('express')
const { 
    getCarts, 
    getCart, 
    addProductToCart, 
    createCart, 
    deleteProductFromCart, 
    deleteCart, 
    createTicket 
} = require('../controllers/carts.controller')

const router = Router()

router
    .get('/', getCarts)
    .get('/:cid', getCart)
    .post('/', createCart)
    .put('/:cid/products/:pid', addProductToCart)
    .delete('/:cid/products/:pid', deleteProductFromCart)
    .delete('/:cid', deleteCart)
    .post('/:cid/purchase', createTicket)


module.exports = router


/* const { Router } = require('express');
const passport = require('passport');
const { passportCall } = require('../utils/passportCall');
const { authorization } = require('../middleware/authorization.middleware');
const {
    addProductToCart,
    createCart,
    deleteCart,
    deleteProductFromCart,
    getCart
} = require('../controllers/carts.controller.js');

const router = Router();

router
    .get('/', passportCall('jwt'), authorization('user'), getCart)
    .get('/:cid', passportCall('jwt'), authorization('user'), getCart)
    .post('/', passportCall('jwt'), authorization('user'), createCart)
    .put('/:cid/products/:pid', passportCall('jwt'), authorization('user'), addProductToCart)
    .delete('/:cid/products/:pid', passportCall('jwt'), authorization('user'), deleteProductFromCart)
    .delete('/:cid', passportCall('jwt'), authorization('user'), deleteCart);

module.exports = router;
 */
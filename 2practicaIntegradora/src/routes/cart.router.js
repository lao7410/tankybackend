const { Router } = require('express');
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

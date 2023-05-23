const { ProductDao, UserDao } = require("../Daos/factory");

const UserService = require('./userService.js')
const ProductService = require('./productService.js')

const userService = new UserService(new UserDao())
const productService = new ProductService(new ProductDao())

module.exports = {
    userService,
    productService
}

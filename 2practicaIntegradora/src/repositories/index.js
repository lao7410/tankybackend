const { UserDao, ProductDao } = require('../Dao/factory.js')
const { ProductModel } = require('../Dao/mongo/models/product.model.js')

const ProductRepositories = require('./product.respositories.js')
const UserRpositories = require('./user.respositories.js')

const userService = new UserRpositories(new UserDao())
const productService = new ProductRepositories(new ProductDao(ProductModel))

module.exports = {
    userService,
    productService
}

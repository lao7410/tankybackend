const { UserDao, ProductDao, OrderDao } = require("../Dao/factory.js"); // Daos - Manager

const { ProductModel } = require("../Dao/mongo/models/product.model.js"); //SchemaModel

const ProductRepositories = require("./product.repositories.js"); // Service
const UserRpositories = require("./user.repositories.js");
const OrderRepositories = require("./ordersServices.js");

const userService = new UserRpositories(UserDao);

const productService = new ProductRepositories(ProductDao(ProductModel));
const orderService = new OrderRepositories( OrderDao());

module.exports = {
  userService,
  productService,
  orderService,
};

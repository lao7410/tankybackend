const { persistence, dbConnection } = require('../config/config.js')

let ProductDao
let UserDao
let CartDao
let OrderDao
let TicketDao

switch (persistence) {
  case 'MONGO':
    dbConnection()

    const ProductDaoMongo = require('./mongo/product.mongo.js')
    ProductDao = ProductDaoMongo

    const UserDaoMongo = require('./mongo/user.mongo.js')
    UserDao = UserDaoMongo

    const CartDaoMongo = require('./mongo/cart.mongo.js')
    CartDao = CartDaoMongo

    const OrderDaoMongo = require('./mongo/order.mongo.js')
    OrderDao = OrderDaoMongo

    const TicketDaoMongo = require('./mongo/TicketDaoMongo.js')
    TicketDao = TicketDaoMongo

    break;
  case 'MEMORY':
    const UserDaoMemory = require('./memory/user.memory.js')
    UserDao = UserDaoMemory
    break;
  case 'ARCHIVO':

    break;

  default:
    break;
}

module.exports = {
  ProductDao,
  UserDao,
  CartDao,
  OrderDao,
  TicketDao
}

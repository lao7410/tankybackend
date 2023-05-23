const { dbConnection } = require('../config/config').configObject;
const { persistence } = require('../config/config.js')
const ProductModel = require('./mongo/models/product.model');
const CartDao = require('./mongo/CartDaoMongo');
const ProductDao = require('./mongo/product.mongo');


function createDaoFactory(persistence) {
  let ProductDao;
  let UserDao;
  let CartDao;
  let OrderDao;
  let TicketDao;

  switch (persistence) {
    case 'MONGO':
      dbConnection()

      const ProductDaoMongo = require('./mongo/product.mongo.js')
      console.log(ProductDaoMongo);
      ProductDao = new ProductDaoMongo(ProductModel)

      const UserDaoMongo = require('./mongo/user.mongo.js')
      UserDao = UserDaoMongo

      const CartDaoMongo = require('./mongo/CartDaoMongo')
      CartDao = CartDaoMongo

      const OrderDaoMongo = require('./mongo/order.mongo.js')
      OrderDao = OrderDaoMongo

      const TicketDaoMongo = require('./mongo/TicketDaoMongo')
      TicketDao = TicketDaoMongo

      break;
    case 'MEMORY':
      const UserDaoMemory = require('./memory/user.memory.js')
      UserDao = UserDaoMemory

      const ProductDaoMemory = require('./memory/product.memory.js')
      ProductDao = new ProductDaoMemory()

      break;
    case 'ARCHIVO':

      break;

    default:
      break;
  }

  return {
    ProductDao,
    UserDao,
    CartDao,
    OrderDao,
    TicketDao
  }
}

module.exports = createDaoFactory;

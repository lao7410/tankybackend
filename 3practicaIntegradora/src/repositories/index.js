const createDaoFactory = require('../Dao/factory.js');

const persistence = process.env.PERSISTENCE || 'MONGO'; // Cambiar valor si es necesario

const { ProductDao, UserDao, CartDao, OrderDao, TicketDao } = createDaoFactory(persistence);

module.exports = {
  ProductRepositories: new (require('./product.repositories'))(ProductDao),
  UserRepositories: new (require('./user.repositories'))(UserDao),
  CartRepositories: new (require('./cart.repositories'))(CartDao),
  OrderRepositories: new (require('./ordersServices.js'))(OrderDao),
  TicketRepositories: new (require('./ticket.repositories'))(TicketDao)
};

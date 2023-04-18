const {persistence, dbConnection} = require('../config/config.js')

let ProductDao
let UserDao
let CartDao

switch (persistence) {
    case 'MONGO':
        dbConnection()
        const ProductDaoMongo = require('./mongo/product.mongo.js')
        ProductDao = ProductDaoMongo

        const UserDaoMongo = require('./mongo/user.mongo.js')
        UserDao = UserDaoMongo
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
    CartDao
}

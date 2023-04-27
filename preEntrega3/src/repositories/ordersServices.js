const OrderDTO = require("../dto/order.dto")

class OrderServices {
    constructor(dao){
        this.dao = dao
    }

    async getOrders(){
        try {
            return await this.dao.get()            
        } catch (error) {
            return error
        }
    }

    async getOrder(oid){
        try {
            return await this.dao.getById(oid)
        } catch (error) {
            return error
        }
    }
    
    async createOrder(newOrder){
        try {
            let newOrderNormalize = new OrderDTO(newOrder)
            let result = await this.dao.create(newOrderNormalize)
            return result            
        } catch (error) {
            return error
        }
    }

    async updateOrder(oid, updateOrder){
        try {
            return await this.dao.update(oid, updateOrder)
        } catch (error) {
            return error
        }
    } 

    async deleteOrder(oid){
        try {
            return await this.dao.remove(oid)
        } catch (error) {
            return error
        }
    }    
}

module.exports = OrderServices




/* 
class OrderService {
    constructor(orderDao){
        this.orderDao = orderDao
    }

    async getOrders(){
        return await this.orderDao.get()
    } 
    async getOrder(oid){
        return await this.orderDao.getById(oid)
    } 
    async ceateOrder(newOrder){
        return await this.orderDao.create(newOrder)
    } 

    
}

module.exports= OrderService
 */
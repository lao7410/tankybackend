const { orderService } = require("../repositories")

class OrdersController {
    async getOrders(req, res){
        try {
            let orders = await orderService.getOrders()
            res.status(200).send(orders)
        } catch (error) {
            console.log(error)
        }
    }
    async getOrder(req,res){
        const {oid} = req.params
        const order = await orderService.getOrder(oid)
        res.status(200).send(order)
    }
    async createOrder(req, res){
        try {
            const {body} = req
            console.log(body)
            const resp = await orderService.ceateOrder(body)
            console.log(resp)
            res.send(resp)
            
        } catch (error) {
            console.log(error)
        }
    }
    updateOrder(){}
    deleteOrder(){}
}

module.exports = new OrdersController()

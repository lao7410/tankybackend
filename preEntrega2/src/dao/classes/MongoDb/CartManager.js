import CartModel from "../../models/cart.js"

export  class CartManager { 
    #carts
    constructor(){
        this.#carts = []
    }

    async createCart () {
        try {
            const cart = await CartModel.create({
                products: []
            })
            return cart
        } catch (error) {
            console.log(error);
        }
    }

    async getCart () {
        try {
          return await CartModel.find()
        } catch (error) {
          console.log(error);
        }
      }

    async addProduct (cid, pid) {
        try {
            let cart = await CartModel.findById(cid)
            let product = cart.products.findIndex(prod => prod.id === pid)
            if (product > -1) {
                cart.products[product].quantity++
                let update = await CartModel.findByIdAndUpdate(cid, cart)
                return update
            } else {
                cart.products.push({_id: pid})
                let update = await CartModel.findByIdAndUpdate(cid, cart)
                return update
            }
        } catch (error) {
            console.log(error);
        }
    }
}
export default CartManager
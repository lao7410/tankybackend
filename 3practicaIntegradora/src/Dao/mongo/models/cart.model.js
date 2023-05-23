const { Schema, model } = require('mongoose')

const collection = 'carts'

const CartSchema = new Schema({
    // userId:{
    //     type: Schema.Types.ObjectId,
    //     ref: 'users'
    // },
    products: {
        type: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: 'products'
            },
            quantity: {
                type: Number
            }            
        }]
    } 
})

CartSchema.pre('findOne', function(){
    this.populate('products.product')
})

const cartModel = model(collection, CartSchema)

module.exports = {
    cartModel
}


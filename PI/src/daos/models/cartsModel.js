import { Schema, model } from "mongoose"

const cartCollection = 'carts'

const cartSchema = new Schema({
    products: {
        type: [{
            pid: {
                type: Schema.Types.ObjectId,
                ref: 'products'
            },
            quantity: {
                type: Number,
                default: 1
            }
        }]
    }
})

cartSchema.pre('find', function(){
    this.populate('products.pid')
})

cartSchema.plugin(mongoosePaginate)

export default model(cartCollection, cartSchema)
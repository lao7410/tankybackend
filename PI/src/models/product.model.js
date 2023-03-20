const { Schema, model } = require('mongoose')

const collection = 'products'

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    category: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    stock: {
        type: Number
    },
    price: {
        type: Number
    },
    description: {
        type: String
    },
    atCreate: {
        type: Date,
        default: new Date()
    }
})

const ProductModel = model(collection, ProductSchema)

module.exports = {
    ProductModel
}


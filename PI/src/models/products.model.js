const {Schema, model} = require('mongoose')


const collection = 'products'
const ProductSchema = new Schema({
    title : {
        type: String,
        required: true,

    },
    price : {
        type: Number,
        required: true
    }
})

module.exports = model(collection, ProductSchema)
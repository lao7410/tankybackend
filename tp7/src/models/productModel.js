const {Schema, model} = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const collection = 'productos'
const ProductSchema = new Schema({ 
    title: {
        type: String, 
        required: true,
    },
    description: {
        type: String, 
        required: true,
    },
    code: {
        type: String, 
        required: true,
        unique: true, 
    },
    price: {
        type: Number, 
        required: true,
    },
    stock: {
        type: Number, 
        required: true,
    },
    category: {
        type: String, 
        required: true,
    },
    thumbnail: {
        type: String, 
        required: true,
    },
    status: {
        type: String, 
 //       required: true,
    }
})

ProductSchema.plugin(mongoosePaginate)

module.exports =  model(collection, ProductSchema)


 

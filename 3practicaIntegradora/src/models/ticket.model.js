
const {Schema, model} = require('mongoose')

const collection = 'tickets'

const ticketSchema = new Schema({
    code: {
        type: String, 
        unique: true,
        required: true 
    },
    purchase_datetime: {
        type: Date, 
        required: true,
        default: Date.now
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: String,
        required: true
    }
})

let ticketModel = model(collection, ticketSchema)

module.exports = {
    ticketModel
}

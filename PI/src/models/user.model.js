const { Schema, model } = require('mongoose')
// import {} from 'mongoose'

const userCollection = 'usuarios'

const UserSchema = Schema({
    first_name: {
        type: String,
        index: true,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: String
})

let UserModel = model(userCollection, UserSchema)

module.exports = {
    UserModel
}

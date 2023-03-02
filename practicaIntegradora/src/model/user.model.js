const { Schema, model } = require('mongoose')

const userCollection = 'Usuarios'
const UserSchema = Schema({
    nombre: {
        type: String,
        require: true
    },
    apellido: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    }
})

module.exports = model(userCollection, UserSchema)
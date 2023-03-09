import { Schema, model } from 'mongoose'

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

export default model(userCollection, UserSchema)
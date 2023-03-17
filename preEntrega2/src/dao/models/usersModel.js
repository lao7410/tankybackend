import { Schema, model } from "mongoose";


const userCollection = 'Usuarios'
const userSchema =Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    }
})



const UserModel = model(userCollection, userSchema)

export default UserModel
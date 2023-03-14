import { Schema, model } from "mongoose";
const userCollection = 'usuarios'

const UserSchema = new Schema({
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
    }
})

const UserModel = model(userCollection,UserSchema)

export default UserModel
import { Router, response } from 'express'
import UsersModel from '../dao/models/users.js'

const router = Router()

// LLAMADA A TODOS LOS USUARRIOS get http://localhost:8080/api/usuarios /
router.get('/', async (req, res) => {
    try {
        let users = await UsersModel.find({})
    
        res.status(200).send({
            msg: 'OK',
            users
        })
    } catch (error) {
        console.log(error)
    }
})

//LLAMADA A LOS USUARRIOS X ID get http://localhost:8080/api/usuarios /id
router.get('/:id', (request, response) => {
    const { id } = request.params
    response.status(200).send(id)
})

// AGREGANDO USUARIOS EN LA SIG RUTA POST http://localhost:8080/api/usuarios /
router.post('/', async (req, res = response) => {
    try {
        let { nombre, apellido, email } = req.body

        // Validar que todos los campos requeridos estén presentes
        if (!nombre || !apellido || !email) {
            return res.status(400).send({ message: 'FALTAN DATOS' })
        }

        // Buscar si ya existe un usuario con el mismo email
        let existingUser = await UsersModel.findOne({ email })
        if (existingUser) {
            return res.status(400).send({ message: 'Ya existe un usuario con este email' })
        }

        // Crear el nuevo usuario
        let result = await UsersModel.create({
            nombre,
            apellido,
            email
        })

        res.status(201).send({
            status: 'OK',
            result
        })

    } catch (error) {
        console.log(error)
    }
})


// MODIF PUT http://localhost:8080/api/usuarios /:userId
router.put('/:uid', async (request, response) => {
    const { uid } = request.params
    let { nombre, apellido, email } = request.body

    // Validar que todos los campos requeridos estén presentes
    if (!nombre || !apellido || !email) {
        return response.status(400).send({ message: 'FALTAN DATOS' })
    }

    // Buscar el usuario por su ID
    let user = await UsersModel.findById(uid)
    if (!user) {
        return response.status(404).send({ message: 'El usuario no existe' })
    }

    // Actualizar el usuario
    let result = await UsersModel.findByIdAndUpdate({ _id: uid }, { nombre, apellido, email }, { new: true })
    response.status(201).send({
        status: 'OK',
        result: result
    })
})

// DELETE http://localhost:8080/api/usuarios /:userId
router.delete('/:uid', async (req, res) => {
    const { uid } = req.params

    // Buscar el usuario por su ID
    let user = await UsersModel.findById(uid)
    if (!user) {
        return res.status(404).send({ message: 'El usuario no existe' })
    }

    // Eliminar el usuario
    await UsersModel.deleteOne({ _id: uid })

    res.status(200).send({
        status: 'OK',
        result: true
    })
})

export default router

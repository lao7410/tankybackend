const { Router } = require('express')
const UsersModel = require('../model/user.model.js')
// import { Router } from 'express'

const router = Router()

/* const arrayUsuarios = [ // db
    { id: '1', nombre: 'nombre 1', apellido: 'apellido 1', genero: 'F' },
    { id: '2', nombre: 'nombre 2', apellido: 'apellido 2', genero: 'F' },
    { id: '3', nombre: 'nombre 3', apellido: 'apellido 3', genero: 'M' },
    { id: '4', nombre: 'nombre 4', apellido: 'apellido 4', genero: 'F' },
    { id: '5', nombre: 'nombre 5', apellido: 'apellido 5', genero: 'M' },
    { id: '6', nombre: 'nombre 6', apellido: 'apellido 6', genero: 'M' },
    { id: '7', nombre: 'nombre 7', apellido: 'apellido 7', genero: 'F' },
    { id: '8', nombre: 'nombre 8', apellido: 'apellido 8', genero: 'M' }
] */



// get http://localhost:8080/api/usuarios /
router.get('/', async (request, res) => {
    try {
        let users = await UsersModel.find({})
        response.statusCode(200).send(arrayUsuarios)
        /* if (!users) */
        res.status(200).send({
            msg: 'success',
            users
        })
    } catch (e) {
        console.log(e);
    }
})

// get http://localhost:8080/api/usuarios /id
router.get('/:id', (request, response) => {
    const { id } = request.params
    response.status(200).send(id)
})



// POST http://localhost:8080/api/usuarios /
router.post('/', async (req, res = response) => {
    //mada el  cliente request 
    try {
        let { nombre, apellido, email } = request.body
        if (!nombre || !apellido || !email) {
            return res.status(400).send({ message: 'faltan campos' })
        }
        let result = await UsersModel.create({
            nombre,
            apellido,
            email: email

        })
        res.status(201).send({
            status: 'succes',
            result
        })
    } catch (e) {
        console.log('error')
    }
    // console.log('user post',user)
    /*  arrayUsuarios.push(user)
     console.log(arrayUsuarios)
     response.status(201).send({
         user,
         message: 'usuario creado' */
})


// PUT http://localhost:8080/api/usuarios /:userId
/* router.put('/:userId', async (request, response) => {

    const { userId } = request.params
    let { nombre, apellido, email } = request.body
    if (!nombre || !apellido || !email) {
        return response.status(400).send({ message: 'Faltan datos mal cargado put' })
    }

    let result = await UsersModel.updateOne({ _id: uid }, { nombre }, { new: true })
    response.status(200).send({
        status: 'succes',
        result
    })
} */
    /* // venga el id
    const index = arrayUsuarios.findIndex(user => user.id === userId)
    // exista el usuario 
    if (index === -1) {
        return response.status(400).send({ message: 'No se encuentra el usuario' })
    }
     
    //mada el  cliente request 
    const user = request.body
if (!user.nombre || !user.apellido) {
    return response.status(400).send({ message: 'Che pasar todos los datos' })
}

// console.log('user post',user)
arrayUsuarios[index] = user
console.log(arrayUsuarios)

response.status(201).send({
    users: arrayUsuarios,
    message: 'usuario Modificado'
})
)

// DELETE http://localhost:8080/api/usuarios /:userId
router.delete('/:userId', (req, res) => {
    const { userId } = req.params

    let arrayTamanno = arrayUsuarios.length
    console.log(arrayTamanno)
    let users = arrayUsuarios.filter(user => user.id !== userId)
    console.log(users.length)
    if (users.length === arrayTamanno) {
        res.status(404).send({ message: "Usuario no encontrado" })
    }
    res.status(200).send({ message: "Usuario borrado", users })
})

module.exports = router
// export default router*/
const { Router } = require('express')
const passport = require('passport')

const { UserModel } = require('../models/userModel')
const { passportCall } = require('../utils/passportCall')

const usersRouter = Router()

// get http://localhost:8080/api/users
usersRouter.get('/', passportCall('jwt'), passport.authenticate('jwt', { session: false, failureRedirect: '/login' }), async (req, res) => {
    try {
        const { page = 1 } = req.query
        const { docs, hasPrevPage, hasNextPage, prevPage, nextPage } = await UserModel.paginate({}, { limit: 10, page, lean: true })
        res.status(200).render('users', {
            users: docs,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
            page
        })
    } catch (error) {
        console.log(error)
    }
})

// get http://localhost:8080/api/users/:id
usersRouter.get('/:id', (request, response) => {
    const { id } = request.params
    response.status(200).send(id)
})

// POST http://localhost:8080/api/users
usersRouter.post('/', async (req, res) => {
    try {
        let { nombre, apellido, email } = req.body
        if (!nombre || !apellido || !email) {
            return res.status(400).send({ message: 'Che pasar todos los datos' })
        }
        let result = await UserModel.create({
            nombre,
            apellido,
            email
        })
        res.status(201).send({
            status: 'success',
            result
        })
    } catch (error) {
        console.log(error)
    }
})

// PUT http://localhost:8080/api/users/:uid
usersRouter.put('/:uid', async (request, response) => {
    const { uid } = request.params
    let { nombre, apellido, email } = request.body
    if (!nombre || !apellido || !email) {
        return response.status(400).send({ message: 'Che pasar todos los datos' })
    }
    let result = await UserModel.updateOne({ _id: uid }, { nombre, apellido, email })
    response.status(201).send({
        status: 'success',
        result
    })
})

// DELETE http://localhost:8080/api/users/:uid
usersRouter.delete('/:uid', async (req, res) => {
    const { uid } = req.params
    await UserModel.deleteOne({ _id: uid })
    res.status(200).send({
        status: 'success',
        result: true
    })
})

module.exports = usersRouter

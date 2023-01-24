const express = require('express')
/* import express, { query } from 'express' */
const classe='./entrega2/classe'
const app = express()
const PORT = 8080
app.use(express.urlencoded({ extended: true }))


///////////////////////////////////////////////////////////////////////////////////////
const arrayUsuarios = [

    { id: '1', name: 'nombre 1', apellido: 'apellido 1', genero: 'M', },
    { id: '2', name: 'nombre 2', apellido: 'apellido 2', genero: 'F', },
    { id: '3', name: 'nombre 3', apellido: 'apellido 3', genero: 'M', },
    { id: '4', name: 'nombre 4', apellido: 'apellido 4', genero: 'M', },
    { id: '5', name: 'nombre 5', apellido: 'apellido 5', genero: 'F', },
    { id: '6', name: 'nombre 6', apellido: 'apellido 6', genero: 'F', }

]

app.get('/', (req, res) => {
    res.send(arrayUsuarios)
})

app.get('/api/:userId', (req, res) => {
    const { userId } = req.params
    const user = arrayUsuarios.find(user => user.id === userId)
    if (!user) return res.send('USUARIO NO EXISTE')
    res.send(user)
})

app.get('/bienvenida', (req, res) => {
    res.send('<h1 style="color:blue;">Hola Mundo</h1>')
}
)

app.get('/usuario', (req, res) => {
    res.send({
        nombre: 'usuario',
        apellido: 'usuario',
        edad: '35',
        email: 'hola@gmail.com'
    }
    )
})

app.get('/params/:nombre/:id', (req, res) => {
    console.log(req.params)
    const { nombre, id } = req.params
    res.send({
        nombre,
        id
    })
})

app.get('/query', (req, res) => {
    console.log(req.query)
    const { genero} = req.query

    if(!genero || (genero!=='F' && genero!=='M')) {
        return res.send({arrayUsuarios})
        }
        let userFilter = arrayUsuarios.filter(user => user.genero === genero)
    res.send({userFilter})

})

app.listen(PORT, err => {
    if (err) console.log(err)
    console.log(`Escuchando el puerto ${PORT}`)
})

////////////////
//CLASE 7
////////////////


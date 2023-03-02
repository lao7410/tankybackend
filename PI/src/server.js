const express = require('express')
const { initConnection } = require('./config/conectionMongo')
const useRouter = require('./routes')
const handlebars = require('express-handlebars')


const app = express()
const PORT = 8080

initConnection()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + 'public'))

//motor de plantillas
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use(useRouter)

app.listen(PORT, err => {
    if (err) return console.error(err)
    console.log('Servidor listening on port: ' + PORT)
}) // localhost 

const MongoStore = require('connect-mongo')
const mongoose = require('mongoose')
/* let url = 'mongodb://localhost:27017/comision32270' */
//let url = "mongodb+srv://tankysoluciones:CoderhouseBackend@cluster0.2zdod6i.mongodb.net/ecommerce?retryWrites=true&w=majority"
const dotenv = require('dotenv')
const { commander } = require('../utils/commander')

const { mode } =  commander.opts()

const enviroment = mode || "development"

dotenv.config({
    path: enviroment === 'development'? './.env.development' : './.env.production' //verificar .env antes de subir
})
//resguardo esta info por la dudas................................................................
/* const objectConfig = {

    dbConnection: async ()=>{
        try {
            // set('stictQuery', set) // sacar leyenda en la consola de deprecado
            await mongoose.connect(url, {
                useNewUrlParser: true,   // mongodb mongodb+srv://
                useUnifiedTopology: true
            })
            // conección base de dato
            console.log('base de dato conectada')
            
        } catch (error) {
            console.log(error)
        }
    },
    session: {
        store: MongoStore.create({  // new MongoStore === new require('connect-mongo')
            mongoUrl: url,
            mongoOptions: {
                useNewUrlParser: true,   // mongodb mongodb+srv://
                useUnifiedTopology: true
            },
            ttl: 10000000000000
        }),
        secret: 'Secreto',
        resave: false,
        // saveUnitialized: false
    }
}

module.exports = {
    objectConfig
} */
//......................................................................................................
const url = process.env.MONGO_URL || 'mongodb://localhost:27017/comision32270'

let configObject = {
    PORT: process.env.PORT || 8000,
    MONGO_URL: url,
    adminName: process.env.ADMIN_NAME || 'admin',
    adminPassword: process.env.ADMIN_PASSWORD || 'admin',
    
    dbConnection:  async () => {
        try {
            await connect(url)
            console.log('DB conectada')  
        } catch (error) {
            console.log(error)
            process.exit()
        }        
    },
    session: {
        store: MongoStore.create({
            mongoUrl: url,
            mongoOptions: {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
            ttl: 15000000000
        }), 
        secret: 's3cr3t0',
        resave: false,
        saveUninitialized: false,
    }
}


module.exports = {
    configObject  
}



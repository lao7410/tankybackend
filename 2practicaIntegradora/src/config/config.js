const MongoStore = require('connect-mongo')
const mongoose = require('mongoose')
let url = 'mongodb://localhost:27017/comision32270'
//let url = "mongodb+srv://tankysoluciones:CoderhouseBackend@cluster0.2zdod6i.mongodb.net/ecommerce?retryWrites=true&w=majority"
const objectConfig = {

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
}

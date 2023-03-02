const { connect } = require('mongoose')
const url = 'mongodb+srv://tankybackend:Alfredo111@tankybackend.u1xclbx.mongodb.net/?retryWrites=true&w=majority/tankybackend'

constdbConnection = async () => {
    return await connect(url, error => {
        if (error) {
            console.log('No se puede conectar')
            process.exit()
        }
        console.log('DB conectada')


    })
}

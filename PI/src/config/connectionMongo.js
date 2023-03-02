const { connect } = require('mongoose')

const initConnection = async () => {
    
    try {
        const url = 'mongodb://localhost:27017/comision32270'
        console.log('Connect to DB in mongodb')
        return await connect(url)

    } catch (error) {
        console.log('error')
        process.exit()
    }

}
module.exports = { initConnection }

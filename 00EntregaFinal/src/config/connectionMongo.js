const { connect } = require('mongoose')

const initConnection = async ()=>{
    try {        
        const url = 'mongodb://localhost:27017/ecommerce'
        console.log('connected to mongodb')
        return await connect(url)
    } catch (error) {
        console.log(error)
        process.exit()
    }
}

module.exports = { initConnection }

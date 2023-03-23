    const {connect} = require('mongoose')

    const initConection = async ()=> {
        const url = "mongodb+srv://tankysoluciones:CoderhouseBackend@cluster0.2zdod6i.mongodb.net/ecommerce?retryWrites=true&w=majority"
        try{
            console.log("conexion exitosa");
            return await connect(url)
        }
        catch(err){
            console.log(err)
            process.exit()
        }
    }

    module.exports = initConection

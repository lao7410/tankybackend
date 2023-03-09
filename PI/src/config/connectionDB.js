import { connect } from "mongoose"

const URL = 'mongodb+srv://tankysoluciones:CoderHouseBackend@cluster0.2zdod6i.mongodb.net/?retryWrites=true&w=majority/'

const connectionDB = async () => {
    try {
        console.log('db conectada');
        return await connect(URL)
    } catch (error) {
        console.log(error);
        process.exit()
    }
}

export default connectionDB
import { connect } from "mongoose";

const url = 'mongodb+srv://tankysoluciones:CoderHouseBackend@cluster0.2zdod6i.mongodb.net/?retryWrites=true&w=majority'


const dbConnection = async () => {
    try {
        console.log('db conectada');
        return await connect(url)
    } catch (error) {
        console.log(error);
        process.exit()
    }
}

export default dbConnection
import mongoose from "mongoose";

const url = 'mongodb://localhost:27017/ecommerce';

export const dbConnection = async () => {
  try {
    console.log('db conectada');
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  } catch (error) {
    console.log(error);
    process.exit();
  }
}

export default dbConnection;
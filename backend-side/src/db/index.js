import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({
    path: './.env'
});

const connectDB = async () => {
    try {
        console.log("Trying to connect mongoose.")
        const connectMongoose = await mongoose.connect(process.env.MONGODB_URI)

        console.log(`✅ MongoDB Connected Successfully!`); 
        console.log(`📊 Database: ${connectMongoose.connection.name}`); 
        console.log(`🖥️ Host: ${connectMongoose.connection.host}`);
    } catch (error) {
        console.log(`Connection failed :${error}`)
        process.exit(1)
    }
}
export default connectDB;
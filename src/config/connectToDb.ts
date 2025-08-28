import mongoose from "mongoose";
import config from "./config";
const {MONGO_URI} = config

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB Connected');
    } catch (err: Error | unknown) {
        console.error(err as Error);
        process.exit(1);
    }
};

export default connectDB;

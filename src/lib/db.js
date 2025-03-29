import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const MONGO_URI = process.env.MONGO_URI;

let isConnected = false; // Check if already connected

export const connectDB = async () => {
    if (isConnected) {
        console.log(" Using existing database connection");
        return;
    }

    try {
        const db = await mongoose.connect(`${MONGO_URI}/${DB_NAME}`);

        isConnected = db.connections[0].readyState === 1;
        console.log(` MongoDB connected at: ${db.connection.host}`);
    } catch (error) {
        console.error(" Database connection error:", error);
        process.exit(1);
    }
};

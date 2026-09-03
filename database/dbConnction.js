import mongoose from "mongoose";

// Database connection function
// This function connects to the MongoDB database using Mongoose.
const dbConnection = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/e-commerce");
        console.log("Database connection successful");
    } catch (error) {
        console.error("Database connection error:", error);
    }
};

export default dbConnection;

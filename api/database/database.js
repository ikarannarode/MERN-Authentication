import mongoose from "mongoose";

export const DatabaseConnection = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('Database connected successfully');
        })
        .catch((error) => {
            console.log('Error while DB connectivity:', error);
        })
} 
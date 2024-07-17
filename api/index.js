import express from "express";
import { DatabaseConnection } from "./database/database.js";
import { config } from 'dotenv'
import UserRoutes from "./routes/user.route.js"
import AuthRoutes from "./routes/auth.route.js"
config({ path: '.env' });

const app = express();

app.use(express.json())

// Database Connection

DatabaseConnection();

// Routes
app.use("/api/user", UserRoutes);
app.use("/api/auth", AuthRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    });

})



app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
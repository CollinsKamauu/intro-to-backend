import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]); // Forces Node to use Google DNS
import app from "./config/app.js";
import dotenv from "dotenv";
import connectDB from "./config/database.js";

dotenv.config({
    path: './.env'
});

const startServer = async () => {
    try {
        await connectDB();

        app.on("error", error => {
            console.error("Error: ", error);
            throw error;

        });

        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running on port ${process.env.PORT || 8000}`);
        });
    } catch (error) {
        console.error("MongoDB connection failed!", error);

    }
}   

startServer();  
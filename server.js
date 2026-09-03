import 'dotenv/config'
import express from "express";
import dbConnection from "./database/dbConnction.js";
import { initRoutes } from './src/modules/init.routes.js';




const app = express();

dbConnection();

app.use(express.json());

app.use(express.static("uploads"));

initRoutes(app)




const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
    console.log("Unhandled Rejection:", err.message);
});

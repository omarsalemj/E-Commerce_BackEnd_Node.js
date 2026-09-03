import 'dotenv/config'
import express from "express";
import dbConnection from "./database/dbConnction.js";
import { initRoutes } from './src/modules/init.routes.js';




const app = express();

dbConnection();

app.use(express.json());

app.use(express.static("uploads"));

initRoutes(app)




app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

process.on("unhandledRejection", (err) => {
    console.log("Unhandled Rejection:", err.message);
});

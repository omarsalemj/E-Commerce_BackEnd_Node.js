import express from "express";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { addToCart } from "./cart.controller.js";



const cartRouter = express.Router();

cartRouter
    .route("/")
    .post(protectedRoutes, allowedTo("user"), addToCart)




export default cartRouter;
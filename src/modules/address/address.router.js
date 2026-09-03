import express from "express";
import { addAddress, getUserAddresses, removeAddress } from "./address.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";



const addressRouter = express.Router();

addressRouter
    .route('/')
    .patch(protectedRoutes, allowedTo('user'), addAddress)
    .delete(protectedRoutes, allowedTo('user'), removeAddress)
    .get(protectedRoutes, allowedTo('user'), getUserAddresses);



export default addressRouter;
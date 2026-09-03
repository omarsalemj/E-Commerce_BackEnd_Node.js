import express from "express";
import { addToWishlist, getUserWishlist, removeFromWishlist } from "./wishlist.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";



const wishlistRouter = express.Router();

wishlistRouter
    .route('/')
    .patch(protectedRoutes, allowedTo('user'), addToWishlist)
    .delete(protectedRoutes, allowedTo('user'), removeFromWishlist)
    .get(protectedRoutes, allowedTo('user'), getUserWishlist);



export default wishlistRouter;
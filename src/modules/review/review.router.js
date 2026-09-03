import express from "express";
import { createReview, deleteReview, getAllReviews, getReview, updateReview } from "./review.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";



const reviewRouter = express.Router();

reviewRouter
    .route("/")
    .post(protectedRoutes, allowedTo('user'), createReview)
    .get(getAllReviews)

reviewRouter
    .route("/:id")
    .get(getReview)
    .put(protectedRoutes, allowedTo('user'), updateReview)
    .delete(protectedRoutes, allowedTo('admin', 'user'), deleteReview)



export default reviewRouter;

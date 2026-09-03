import express from "express";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { createCoupon, deleteCoupon, getAllCoupons, getCoupon, updateCoupon } from "./coupon.controller.js";



const couponRouter = express.Router();

couponRouter
    .route('/')
    .post(protectedRoutes, allowedTo('admin', 'user'), createCoupon)
    .get(getAllCoupons);

couponRouter
    .route('/:id')
    .get(getCoupon)
    .put(protectedRoutes, allowedTo('admin', 'user'), updateCoupon)
    .delete(protectedRoutes, allowedTo('admin', 'user'), deleteCoupon);



export default couponRouter;
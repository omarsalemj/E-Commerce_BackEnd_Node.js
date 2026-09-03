import express from "express";
import { createUser, getAllUsers, getUser, updateUser, deleteUser, changeUserPassword } from "./user.controller.js";
import { protectedRoutes, allowedTo } from "../auth/auth.controller.js";


const userRouter = express.Router();

userRouter
    .route("/")
    .post(createUser)
    .get(getAllUsers);

userRouter
    .route("/:id")
    .get(getUser)
    .put(protectedRoutes, allowedTo("admin", "user"), updateUser)
    .delete(protectedRoutes, allowedTo("admin", "user"), deleteUser);

userRouter.patch("/change-password/:id", protectedRoutes, allowedTo("admin", "user"), changeUserPassword);



export default userRouter;
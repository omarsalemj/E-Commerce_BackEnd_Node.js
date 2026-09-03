import express from "express";
import * as subCategoryController from "./subcategory.controller.js";
import { createSubcategorySchema, getSubcategorySchema, updateSubcategorySchema } from "./subcategory.validation.js";
import { validation } from "../../middleware/validation.js";
import { protectedRoutes, allowedTo } from "../auth/auth.controller.js";



const subCategoryRouter = express.Router({mergeParams: true});

subCategoryRouter
    .route("/")
    .post(protectedRoutes, allowedTo("admin"), validation(createSubcategorySchema), subCategoryController.createSubCategory)
    .get(subCategoryController.getAllSubCategories);

subCategoryRouter
    .route("/:id")
    .get(validation(getSubcategorySchema), subCategoryController.getSubCategory)
    .put(protectedRoutes, allowedTo("admin"), validation(updateSubcategorySchema), subCategoryController.updateSubCategory)
    .delete(protectedRoutes, allowedTo("admin"), validation(getSubcategorySchema), subCategoryController.deleteSubCategory);



export default subCategoryRouter;
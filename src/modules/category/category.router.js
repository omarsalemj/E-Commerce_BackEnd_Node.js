import express, { application } from "express";
import { createCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from "./category.controller.js";
import subCategoryRouter from "../subcategory/subcategory.router.js";
import { validation } from "../../middleware/validation.js";
import { createCategorySchema, getCategorySchema, updateCategorySchema } from "./category.validation.js";
import { uploadSingleFile } from "../../middleware/uploadFile.js";
import { protectedRoutes, allowedTo } from "../auth/auth.controller.js";



const categoryRouter = express.Router();

categoryRouter.use('/:categoryId/subcategories', subCategoryRouter)

categoryRouter
    .route('/')
    .post(protectedRoutes, allowedTo("admin"), uploadSingleFile('image', 'category'), validation(createCategorySchema), createCategory)
    .get(getAllCategories);

categoryRouter
    .route('/:id')
    .get(validation(getCategorySchema), getCategory)
    .put(protectedRoutes, allowedTo("admin"), uploadSingleFile('image', 'category'), validation(updateCategorySchema), updateCategory)
    .delete(protectedRoutes, allowedTo("admin"), validation(getCategorySchema), deleteCategory);


export default categoryRouter;
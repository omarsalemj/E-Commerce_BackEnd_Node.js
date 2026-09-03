import express from "express";
import { createProduct, getAllProducts, getProduct, updateProduct, deleteProduct } from "./product.controller.js";
import { createProductSchema, getProductSchema, updateProductSchema } from "./product.validation.js";
import { validation } from "../../middleware/validation.js";
import { uploadMixFiles } from "../../middleware/uploadFile.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";



const ProductRouter = express.Router();

let fieldsArr = [{ name: 'imgCover', maxCount: 1 }, { name: 'images', maxCount: 8 }]

ProductRouter
  .route("/")
  .post(protectedRoutes, allowedTo("admin", "user"), uploadMixFiles(fieldsArr, "product"), validation(createProductSchema), createProduct)
  .get(getAllProducts);

ProductRouter
  .route("/:id")
  .get(validation(getProductSchema), getProduct)
  .put(protectedRoutes, allowedTo("admin", "user"), validation(updateProductSchema), updateProduct)
  .delete(protectedRoutes, allowedTo("admin"), validation(getProductSchema), deleteProduct);

export default ProductRouter;

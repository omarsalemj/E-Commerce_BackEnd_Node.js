import AppError from "../utils/AppError.js";
import globalErrorHandler from "../middleware/globalErrorHandler.js";
import categoryRouter from "./category/category.router.js";
import subCategoryRouter from "./subcategory/subcategory.router.js";
import brandRouter from "./brand/brand.router.js";
import ProductRouter from "./product/product.router.js";
import userRouter from './user/user.router.js';
import authRouter from './auth/auth.router.js';
import reviewRouter from './review/review.router.js';
import wishlistRouter from "./wishlist/wishlist.router.js";
import addressRouter from "./address/address.router.js";
import couponRouter from "./coupon/coupon.router.js";
import cartRouter from "./cart/cart.router.js";



export const initRoutes = (app)=>{
    app.use("/api/v1/categories", categoryRouter);
    app.use("/api/v1/subcategories", subCategoryRouter);
    app.use("/api/v1/brands", brandRouter);
    app.use("/api/v1/products", ProductRouter);
    app.use("/api/v1/users", userRouter);
    app.use("/api/v1/auth", authRouter);
    app.use("/api/v1/reviews", reviewRouter);
    app.use("/api/v1/wishlist", wishlistRouter);
    app.use("/api/v1/addresses", addressRouter);
    app.use("/api/v1/coupons", couponRouter);
    app.use("/api/v1/cart", cartRouter);

    app.all("*", (req, res, next) => {
        next(new AppError(`cannot find this route: ${req.originalUrl}`, 404));
    });

    // Global error handler
    app.use(globalErrorHandler)
}
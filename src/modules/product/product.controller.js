import slugify from "slugify";
import productModel from "../../../database/models/product.model.js";
import AppError from "../../utils/AppError.js";
import catchAsyncError from "../../middleware/catchAsyncError.js";
import { ApiFeatures } from "../../utils/ApiFeatures.js";

const createProduct = catchAsyncError(async (req, res, next) => {
    req.body.slug = slugify(req.body.title);
    req.body.imgCover = req.files.imgCover ? req.files.imgCover[0].filename : '';
    req.body.images = req.files.images ? req.files.images.map(file => file.filename) : [];
    let result = new productModel(req.body);
    await result.save();
    res.status(201).json({ message: 'success', result });
});

const getAllProducts = catchAsyncError(async (req, res, next) => {
    let apiFeatures = new ApiFeatures(productModel.find(), req.query)
        .paginate()
        .filter()
        .sort()
        .search()
        .fields();
    let result = await apiFeatures.mongooseQuery;
    res.json({ message: 'success', page: apiFeatures.page, result });
});

const getProduct = catchAsyncError(async (req, res, next) => {
    const {id} = req.params;
    const result = await productModel.findById(id);
    if (!result) {
        return next(new AppError('Product not found', 404));
    }
    res.status(200).json({ message: 'success', result });
});

const updateProduct = catchAsyncError(async (req, res, next) => {
    const {id} = req.params;
    if (req.body.title) req.body.slug = slugify(req.body.title);
    const result = await productModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
        return next(new AppError('Product not found', 404));
    }
    res.status(200).json({ message: 'success', result });
});

const deleteProduct = catchAsyncError(async (req, res, next) => {
    const {id} = req.params;
    const result = await productModel.findByIdAndDelete(id);
    if (!result) {
        return next(new AppError('Product not found', 404));
    }
    res.status(204).json({ message: 'success', result });
});

export{
    createProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct
};
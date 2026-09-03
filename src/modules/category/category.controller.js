import categoryModel from "../../../database/models/category.model.js  ";
import slugify from "slugify";
import AppError from "../../utils/AppError.js";
import catchAsyncError from "../../middleware/catchAsyncError.js";
import { ApiFeatures } from "../../utils/ApiFeatures.js";



const createCategory = catchAsyncError(async (req, res) => {
    req.body.slug = slugify(req.body.name);
    req.body.image = req.file ? req.file.filename : '';
    let result = new categoryModel(req.body);
    await result.save();
    res.json({message: 'success', result})
})

const getAllCategories = catchAsyncError(async (req, res) => {
    let apiFeatures = new ApiFeatures(categoryModel.find(), req.query)
        .paginate()
        .filter()
        .sort()
        .search()
        .fields();
    let result = await apiFeatures.mongooseQuery;
    res.json({ message: 'success', page: apiFeatures.page, result });
})

const getCategory = catchAsyncError(async (req, res, next) => {
    const {id} = req.params;
    let result = await categoryModel.findById(id);
    if (!result) {
        return next(new AppError('Category not found', 404));
    }
    res.json({message: 'success', result});
})

const updateCategory = catchAsyncError(async (req, res, next) => {
    const {id} = req.params;
    req.body.slug = slugify(req.body.name);
    req.body.image = req.file.filename
    let result = await categoryModel.findByIdAndUpdate(id, req.body, {new: true});
    if (!result) {
        return next(new AppError('Category not found', 404));
    }
    res.json({message: 'success', result});
})

const deleteCategory = catchAsyncError(async (req, res, next) => {
    const {id} = req.params;
    let result = await categoryModel.findByIdAndDelete(id);
    if (!result) {
        return next(new AppError('Category not found', 404));
    }
    res.json({message: 'success', result});
})



export {createCategory, getAllCategories, getCategory, updateCategory, deleteCategory};
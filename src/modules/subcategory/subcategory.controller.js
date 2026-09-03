import subCategoryModel from "../../../database/models/subcategory.model.js";
import AppError from "../../utils/AppError.js";
import catchAsyncError from "../../middleware/catchAsyncError.js";
import slugify from "slugify";
import { ApiFeatures } from "../../utils/ApiFeatures.js";



const createSubCategory = catchAsyncError(async (req, res) => {
    const { name, category } = req.body;
    let result = new subCategoryModel({ name, category, slug: slugify(name) });
    await result.save();
    res.json({ message: 'success', result });
});

const getAllSubCategories = catchAsyncError(async (req, res) => {
    let filter = {}
    req.params.categoryId ? filter = {category: req.params.categoryId} : ''
    let apiFeatures = new ApiFeatures(subCategoryModel.find(filter), req.query)
        .paginate()
        .filter()
        .sort()
        .search()
        .fields();
    let result = await apiFeatures.mongooseQuery;
    res.json({ message: 'success', page: apiFeatures.page, result });
});

const getSubCategory = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    let result = await subCategoryModel.findById(id);
    if (!result) {
        return next(new AppError('SubCategory not found', 404));
    }
    res.json({ message: 'success', result });
});

const updateSubCategory = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const { name, category } = req.body;
    let result = await subCategoryModel.findByIdAndUpdate(id, { name, category, slug: slugify(name) }, { new: true });
    if (!result) {
        return next(new AppError('SubCategory not found', 404));
    }
    res.json({ message: 'success', result });
});

const deleteSubCategory = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    let result = await subCategoryModel.findByIdAndDelete(id);
    if (!result) {
        return next(new AppError('SubCategory not found', 404));
    }
    res.json({ message: 'success', result });
});



export { createSubCategory, getAllSubCategories, getSubCategory, updateSubCategory, deleteSubCategory };
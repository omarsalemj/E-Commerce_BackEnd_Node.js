import userModel from "../../../database/models/user.model.js";
import AppError from "../../utils/AppError.js";
import catchAsyncError from "../../middleware/catchAsyncError.js";
import { ApiFeatures } from "../../utils/ApiFeatures.js";




const createUser = catchAsyncError(async (req, res, next) => {
    let user = await userModel.findOne({email: req.body.email});
    if (user) return next(new AppError("Email already exists", 409));
    let result = new userModel(req.body);
    await result.save();
    res.status(201).json({message: 'success', result})
});

const getAllUsers = catchAsyncError(async (req, res, next) => {
    let apiFeatures = new ApiFeatures(userModel.find(), req.query)
        .paginate().filter().sort().search().fields();
    let result = await apiFeatures.mongooseQuery;
    res.status(200).json({message: 'success', page: apiFeatures.page, result});
})

const getUser = catchAsyncError(async (req, res, next) => {
    let result = await userModel.findById(req.params.id);
    if (!result) return next(new AppError("User not found", 404));
    res.status(200).json({message: 'success', result});
})

const updateUser = catchAsyncError(async (req, res, next) => {
    let result = await userModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if (!result) return next(new AppError("User not found", 404));
    res.status(200).json({message: 'success', result});
})

const deleteUser = catchAsyncError(async (req, res, next) => {
    let result = await userModel.findByIdAndDelete(req.params.id);
    if (!result) return next(new AppError("User not found", 404));
    res.status(200).json({message: 'success', result});
})

const changeUserPassword = catchAsyncError(async (req, res, next) => {
    req.body.passwordChangedAt = Date.now();
    let result = await userModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if (!result) return next(new AppError("User not found", 404));
    res.status(200).json({message: 'success', result});
})




export { createUser, getAllUsers, getUser, updateUser, deleteUser, changeUserPassword };
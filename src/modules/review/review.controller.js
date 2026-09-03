import productModel from "../../../database/models/product.model.js";
import reviewModel from "../../../database/models/review.model.js";
import catchAsyncError from "../../middleware/catchAsyncError.js";
import { ApiFeatures } from "../../utils/ApiFeatures.js";
import AppError from "../../utils/AppError.js";



const createReview = catchAsyncError(async (req, res, next) => {
    req.body.user = req.user._id

    let product = await productModel.findById(req.body.product)
    if(!product) return next(new AppError('Product not found', 404));
    req.body.ratings = product.ratingAvg

    let isReviewed = await reviewModel.findOne({user: req.user._id, product: req.body.product}) 
    if(isReviewed) return next(new AppError('You have already reviewed this product', 400));

    let result = new reviewModel(req.body)
    await result.save()
    res.status(201).json({message: 'success', result})
})

const getAllReviews = catchAsyncError(async (req, res, next)=>{
    let apiFeatures = new ApiFeatures(reviewModel.find(), req.query)
        .paginate().filter().sort().search().fields();
    let result = await apiFeatures.mongooseQuery;
    res.status(200).json({message: 'success', page: apiFeatures.page, result})
})

const getReview = catchAsyncError(async (req, res, next)=>{
    let result = await reviewModel.findById(req.params.id)
    if(!result) return next(new AppError('Review not found', 404));
    res.status(200).json({message: 'success', result})
})

const updateReview = catchAsyncError(async (req, res, next)=>{
    let review = await reviewModel.findById(req.params.id)
    if(!review) return next(new AppError('Review not found', 404));
    if(review.user.toString() != req.user._id.toString()) return next(new AppError('You are not authorized to update this review', 403));

    let result = await reviewModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
    if(!result) return next(new AppError('Review not found', 404));
    res.status(200).json({message: 'success', result})
})

const deleteReview = catchAsyncError(async (req, res, next)=>{
    let result = await reviewModel.findByIdAndDelete(req.params.id)
    if(!result) return next(new AppError('Review not found', 404));
    res.status(200).json({message: 'success', result})
})




export {
    createReview,
    getAllReviews,
    getReview,
    updateReview,
    deleteReview
}
    
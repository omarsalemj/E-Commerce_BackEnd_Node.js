import userModel from "../../../database/models/user.model.js";
import catchAsyncError from "../../middleware/catchAsyncError.js";




const addToWishlist = catchAsyncError(async (req, res, next)=>{
    const {product} = req.body
    let result = await userModel.findByIdAndUpdate(req.user._id, {$addToSet: {wishlist: product}}, {new: true})
    res.status(200).json({message: 'success', result: result.wishlist})
})

const removeFromWishlist = catchAsyncError(async (req, res, next)=>{
    const {product} = req.body
    let result = await userModel.findByIdAndUpdate(req.user._id, {$pull: {wishlist: product}}, {new: true})
    res.status(200).json({message: 'success', result: result.wishlist})
})

const getUserWishlist = catchAsyncError(async (req, res, next)=>{
    let result = await userModel.findById(req.user._id).populate('wishlist')
    res.status(200).json({message: 'success', result: result.wishlist})
})



export {
    addToWishlist,
    removeFromWishlist,
    getUserWishlist
}
import userModel from "../../../database/models/user.model.js";
import catchAsyncError from "../../middleware/catchAsyncError.js";




const addAddress = catchAsyncError(async (req, res, next)=>{
    let result = await userModel.findByIdAndUpdate(req.user._id, {$addToSet: {addresses:req.body}}, {new: true})
    res.status(200).json({message: 'success', result: result.addresses})
})

const removeAddress = catchAsyncError(async (req, res, next)=>{
    let result = await userModel.findByIdAndUpdate(req.user._id, {$pull: {addresses: {_id: req.body.address}}}, {new: true})
    res.status(200).json({message: 'success', result: result.addresses})
})

const getUserAddresses = catchAsyncError(async (req, res, next)=>{
    let result = await userModel.findById(req.user._id)
    res.status(200).json({message: 'success', result: result.addresses})
})




export {
    addAddress,
    removeAddress,
    getUserAddresses
}
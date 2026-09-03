import jwt from "jsonwebtoken";
import catchAsyncError from "../../middleware/catchAsyncError.js";
import userModel from "../../../database/models/user.model.js";
import AppError from "../../utils/AppError.js";
import bcrypt from "bcrypt";



export const signup = catchAsyncError(async (req, res, next)=>{
    let isUserExist = await userModel.findOne({email: req.body.email})
    if(isUserExist) return next(new AppError('User already exists with this email', 400))
    let user = new userModel(req.body)
    await user.save()
    res.status(201).json({message: 'success', user})
})

export const signin = catchAsyncError(async (req, res, next)=>{
    const {email, password} = req.body
    let isUserExist = await userModel.findOne({email})
    if(!isUserExist) return next(new AppError('Invalid email or password', 400))
    const match = await bcrypt.compare(password, isUserExist.password)
    if(!match) return next(new AppError('Invalid email or password', 400))
    const token = jwt.sign({id: isUserExist._id, name: isUserExist.name, role: isUserExist.role}, process.env.JWT_SECRET)
    res.status(200).json({message: 'success', token})
})


export const protectedRoutes = catchAsyncError(async (req, res, next)=>{
    let {token} = req.headers
    if(!token) return next(new AppError('You are not logged in', 401))

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    let user = await userModel.findById(decoded.id)
    if(!user) return next(new AppError('User not found', 404))
    
    if(user.passwordChangedAt){
        let changedPasswordAt = user.passwordChangedAt.getTime() / 1000
        if(changedPasswordAt > decoded.iat) return next(new AppError('User recently changed password! Please log in again.', 401))
    }

    req.user = user
    next()
})


export const allowedTo = (...roles) =>{
    return catchAsyncError(async (req, res, next)=>{
        if(!roles.includes(req.user.role)) return next(new AppError('You are not allowed to perform this action', 403))
        next()
    })
}
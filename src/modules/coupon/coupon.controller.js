import couponModel from "../../../database/models/coupon.model.js";
import catchAsyncError from "../../middleware/catchAsyncError.js";
import AppError from "../../utils/AppError.js";
import qrcode from "qrcode";



const createCoupon = catchAsyncError(async (req, res, next) => {
    const { code, discount, expires } = req.body;
    if (!code || !discount || !expires) return next(new AppError("All fields are required", 400));
    const existingCoupon = await couponModel.findOne({ code });
    if (existingCoupon) return next(new AppError("Coupon code already exists", 400));
    const newCoupon = await couponModel.create({ code, discount, expires });
    res.status(201).json({ message: "Coupon created successfully", coupon: newCoupon });
});

const getAllCoupons = catchAsyncError(async (req, res, next) => {
    const coupons = await couponModel.find();
    res.status(200).json({ message: "success", coupons });
});

const getCoupon = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const coupon = await couponModel.findById(id);
    if (!coupon) return next(new AppError("Coupon not found", 404));
    let url = await qrcode.toDataURL(coupon.code);
    res.status(200).json({ message: "success", coupon, url });
});

const updateCoupon = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const { code, discount, expires } = req.body;
    const updatedCoupon = await couponModel.findByIdAndUpdate(id, { code, discount, expires }, { new: true });
    if (!updatedCoupon) return next(new AppError("Coupon not found", 404));
    res.status(200).json({ message: "success", coupon: updatedCoupon });
});

const deleteCoupon = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const deletedCoupon = await couponModel.findByIdAndDelete(id);
    if (!deletedCoupon) return next(new AppError("Coupon not found", 404));
    res.status(200).json({ message: "success", coupon: deletedCoupon });
});



export { createCoupon, getAllCoupons, getCoupon, updateCoupon, deleteCoupon };
import mongoose from "mongoose";

const couponSchema = mongoose.Schema({
  code: {
    type: String,
    trim: true,
    required: [true, "Coupon code is required"],
    unique: [true, "Coupon code must be unique"],
  },
  discount: {
    type: Number,
    required: [true, "Discount is required"],
    min: [0, "Discount must be positive"],
  },
  expires: {
    type: Date,
    required: [true, "Expiry date is required"],
  },
}, {
  timestamps: true,
});

const couponModel = mongoose.model("coupon", couponSchema);

export default couponModel;

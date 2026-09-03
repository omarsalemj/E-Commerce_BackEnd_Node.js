import mongoose from "mongoose";



const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  cartItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1
      },
      price: Number
    }
  ],
  totalPrice: Number,
  discount: Number,
  totalPriceAfterDiscount: Number
},
{
  timestamps: true
});

const cartModel = mongoose.model("cart", cartSchema);




export default cartModel;
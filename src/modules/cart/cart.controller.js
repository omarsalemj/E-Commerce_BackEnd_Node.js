import cartModel from "../../../database/models/cart.model.js";
import catchAsyncError from "../../middleware/catchAsyncError.js";



const addToCart = catchAsyncError(async (req, res, next) => {
    let isCartExist = await cartModel.findOne({user: req.user._id});
    if(!isCartExist){
        let result = new cartModel({user: req.user._id, cartItems: [req.body]});
        await result.save();
        return res.status(201).json({message: 'success', result})
    }

    let cartItem = isCartExist.cartItems.find(item => item.product == req.body.product);
    cartItem ? cartItem.quantity += 1 : isCartExist.cartItems.push(req.body);

    await isCartExist.save();
    return res.status(200).json({message: 'success', cart: isCartExist})
})



export {addToCart}
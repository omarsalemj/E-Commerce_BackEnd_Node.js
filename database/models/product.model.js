import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Product title is required"],
    unique: [true, "Product title must be unique"],
    trim: true,
    minlength: [2, "Product title must be at least 2 characters long"],
  },
  slug : {
    type: String,
    required: [true, "Product slug is required"],
    lowercase: true,
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price must be positive"],
  },
  priceAfterDiscount: {
    type: Number,
    min: [0, "Price after discount must be positive"],
  },
  ratingAvg: {
    type: Number,
    min: [0, "Rating must be at least 0"],
    max: [5, "Rating cannot exceed 5"],
  },
  ratingCount: {
    type: Number,
    default: 0,
    min: [0, "Rating count cannot be negative"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    minlength: [10, "Description must be at least 10 characters long"],
    maxlength: [500, "Description cannot exceed 500 characters"],
    trim: true,
  },
  quantity: {
    type: Number,
    default: 0,
    required: [true, "Quantity is required"],
    min: [0, "Quantity must be positive"],
  },
  sold: {
    type: Number,
    default: 0,
    min: [0, "Sold must be positive"],
  },
  imgCover: String,
  images: [String],
  category: {
    type: mongoose.Types.ObjectId,
    ref: "category",
    required: [true, "Category is required"],
  },
  subCategory: {
    type: mongoose.Types.ObjectId,
    ref: "subCategory",
    required: [true, "Subcategory is required"],
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "brand",
    required: [true, "Brand is required"],
  },
}, {
  timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true }
});


productSchema.post('init', (doc)=>{
  doc.imgCover = doc.imgCover ? `${process.env.BASE_URL}/product/${doc.imgCover}` : '';
  doc.images = doc.images.map(image => `${process.env.BASE_URL}/product/${image}`);
})

productSchema.virtual('reviews', {
  ref: 'review',
  localField: '_id',
  foreignField: 'product',
})

productSchema.pre(/^find/, function(){
  this.populate('reviews')
})


const productModel = mongoose.model("product", productSchema);

export default productModel;

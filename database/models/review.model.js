import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
  comment: {
    type: String,
    trim: true,
    required: [true, "Comment is required"],
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: "product",
  },
  ratings: {
    type: Number,
    min: [1, "Rating must be at least 1"],
    max: [5, "Rating must be at most 5"],
  },
}, {
  timestamps: true,
});


reviewSchema.pre(/^find/, function(){
  this.populate('user', 'name')
})


const reviewModel = mongoose.model("review", reviewSchema);

export default reviewModel;

import mongoose from "mongoose";

const brandSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: [true, "Brand name must be unique"],
    trim: true,
    minlength: [2, "Brand name must be at least 2 characters long"],
  },
    slug: {
        type: String,
        required: true,
        lowercase: true
  },
  logo: {
    type: String,
  },
}, {
  timestamps: true,
});

brandSchema.post('init', (doc)=>{
  doc.logo = `${process.env.BASE_URL}/brand/${doc.logo}`
})

const brandModel = mongoose.model("brand", brandSchema);

export default brandModel;
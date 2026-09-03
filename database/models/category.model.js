import mongoose from "mongoose";


// Category schema definition
const categorySchema = mongoose.Schema({
    name: {
        type: String,
        unique: [true, "Category name must be unique"],
        required: true,
        trim: true,
        minLength: [2, "Category name must be at least 2 characters long"],
    },
    slug: {
        type: String,
        required: true,
        lowercase: true
    },
    image: String
}, {
    timestamps: true
});

categorySchema.post('init', (doc)=>{
    doc.image = `${process.env.BASE_URL}/category/${doc.image}`
})

// Category model
const categoryModel = mongoose.model("category", categorySchema);

export default categoryModel;

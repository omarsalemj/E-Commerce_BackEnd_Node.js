import mongoose from "mongoose";


// subCategory schema definition
const subCategorySchema = mongoose.Schema({
    name: {
        type: String,
        unique: [true, "subCategory name must be unique"],
        required: true,
        trim: true,
        minLength: [2, "subCategory name must be at least 2 characters long"],
    },
    slug: {
        type: String,
        required: true,
        lowercase: true
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'category'
    }
}, {
    timestamps: true
});

// subCategory model
const subCategoryModel = mongoose.model("subcategory", subCategorySchema);

export default subCategoryModel;

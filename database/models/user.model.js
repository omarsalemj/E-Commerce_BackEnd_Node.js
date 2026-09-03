import mongoose from "mongoose";
import bcrypt from "bcrypt";



const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [2, "Name must be at least 2 characters long"],
    maxlength: [100, "Name cannot exceed 100 characters"],
  },
  email: {
    type: String,
    trim: true,
    required: [true, "Email is required"],
    unique: [true, "Email must be unique"],
    match: [/.+\@.+\..+/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  },
  passwordChangedAt: Date,
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    unique: [true, "Phone number must be unique"],
    match: [/^\d{11}$/, "Please enter a valid phone number"],
  },
  profilePic: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  }],
  addresses: [{
    city: String,
    street: String,
    zipCode: String,
    phone: String,
  }]
}, {
  timestamps: true,
});


userSchema.pre('save', function (){
  this.password = bcrypt.hashSync(this.password, 10);
})

userSchema.pre('findOneAndUpdate', function (){
  if (this._update.password) this._update.password = bcrypt.hashSync(this._update.password, 10);
})


const userModel = mongoose.model("user", userSchema);

export default userModel;

import mongoose from "mongoose";

const userShcma = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    unique: [true, "username must be unique"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email must be unique"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  verified: {
    type: Boolean,
    default: false,
  },
  phoneNumber: {
    type: String,
    default: "",
  },
  collegeBranch: {
    type: String,
    required: [true, "College branch is required"], // Crucial for the student profile
  },
  avatarUrl: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    enum: ["student", "admin"],
    default: "student",
  },

},{
  timestamps: true
});
const UserModel = mongoose.models.users || mongoose.model("users", userShcma); 

export default UserModel;

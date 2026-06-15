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
});

const UserModel = mongoose.model("users", userShcma);

export default UserModel;

import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    otpHash: {
      type: String,
      required: [true, "OTP is required"],
    },
    purpose: {
      type: String,
      enum: ["email-verification", "password-reset"],
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      expires: 300, // 5 minutes
    },
    
  },
  { timestamps: true },
);

const OtpModel = mongoose.model("otp", otpSchema);
export default OtpModel;

import UserModel from "../Model/user.Model.js";
import crypto from "crypto";
import bcrypt from "bcrypt"; // add this

import jwt from "jsonwebtoken";
import config from "../config/config.js";
import SessionModel from "../Model/session.Model.js";
import OtpModel from "../Model/opt.Model.js";
import { sendEmail } from "../services/email.service.js";
import { generateOtp, getOtpHtml } from "../utils/utils.js";

export async function register(req, resp) {
  const { username, email, password } = req.body;

  const isAlreadyRegistred = await UserModel.findOne({
    $or: [{ username }, { email }],
  });
  if (isAlreadyRegistred) {
    return resp
      .status(409)
      .json({ message: " Username or email alredy exist ..." });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await UserModel.create({
    username,
    email,
    password: hashPassword,
    verified: false,
    role:"student"
  });

  const otp = generateOtp();

  const html = getOtpHtml(otp);

  const otpHash = crypto.createHash("sha256").update(otp).digest("hex");
  //add error handling  function sendEmail
  try {
    await sendEmail(email, "OTP Verification", `Your OTP Code is ${otp}`, html);
  } catch (error) {
    console.log("OTP email send failed:", error.message);

    return resp.status(500).json({
      message: "User created but OTP email could not be sent",
      error: error.message,
    });
  }

  await OtpModel.create({
    user: user._id,
    email,
    otpHash,
    purpose: "email-verification",
    createdAt: Date.now(),
  });

  resp.status(201).json({
    message: "user created successfully",
    user: {
      username: user.username,
      email: user.email,
      verified: user.verified,
    },
  });
}

export async function login(req, res) {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  if (!user.verified) {
    return res.status(401).json({
      message: "Email not verified",
    });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    return res.status(401).json({
      message: "Invalid password or incorrect password",
    });
  }
  const refreshToken = jwt.sign({ id: user._id }, config.JWT_SECRET, {
    expiresIn: "7d", //7days
  });

  const refreshTokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  const session = await SessionModel.create({
    user: user._id,
    refreshTokenHash: refreshTokenHash,
    ip: req.ip,
    userAgent: req.headers["user-agent"],
  });

  const accessToken = jwt.sign(
    {
      id: user._id,
      sessionId: session._id,
    },
    config.JWT_SECRET,
    {
      expiresIn: "15m",
    },
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, //7days
  });
  res.status(200).json({
    message: "User logged in successfully",
    user: {
      username: user.username,
      email: user.email,
      role: user.role,
    },
    accessToken,
  });
}

export async function getMe(req, res) {
  try {
    // Get token from Authorization header
    const accessToken = req.headers.authorization?.split(" ")[1];
    if (!accessToken) {
      return res.status(401).json({ message: "Token is required" });
    }

    // Verify access token

    let decoded;
    try {
      decoded = jwt.verify(accessToken, config.JWT_SECRET);
    } catch (error) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    // Find user by ID
    const user = await UserModel.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with user info
    res.status(200).json({
      message: "User fetched successfully",
      user: {
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error in getMe:", error.message);
    res.status(403).json({ message: "Invalid or expired token" });
  }
}

export async function refreshToken(req, res) {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token is required" });
  }
  let decoded;
try {
  decoded = jwt.verify(refreshToken, config.JWT_SECRET);
} catch (error) {
  return res.status(403).json({ message: "Invalid or expired refresh token" });
}

  const user = await UserModel.findById(decoded.id);

  const refreshTokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");
  const session = await SessionModel.findOne({
    refreshTokenHash,
    revoked: false,
  });
  if (!session) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }
  if (session.revoked) {
    return res.status(401).json({ message: "Refresh token has been revoked" });
  }
  const accessToken = jwt.sign({ id: user.id }, config.JWT_SECRET, {
    expiresIn: "15m",
  });
  const newrefreshToken = jwt.sign({ id: user.id }, config.JWT_SECRET, {
    expiresIn: "7d",
  });
  const newrefreshTokenHash = crypto
    .createHash("sha256")
    .update(newrefreshToken)
    .digest("hex");
  session.refreshTokenHash = newrefreshTokenHash;
  session.save();
  res.cookie("refreshToken", newrefreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.status(200).json({
    message: "access token successfully refreshed",
    accessToken,
  });
}

//logout function
export async function logout(req, res) {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token is required" });
  }
  const refreshTokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");
  const session = await SessionModel.updateOne(
    { refreshTokenHash },
    { revoked: true },
  );

  if (session.modifiedCount === 0) {
    return res.status(404).json({ message: "Session not found" });
  }
  res.clearCookie("refreshToken");
  res.status(200).json({ message: "Logout successfully" });
}

export async function logoutAll(req, res) {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token is required" });
  }
  const decoded = jwt.verify(refreshToken, config.JWT_SECRET);
  const user = await UserModel.findById(decoded.id);
  const sessions = await SessionModel.updateMany(
    { user: user._id },
    { revoked: true },
  );
  if (sessions.modifiedCount === 0) {
    return res.status(404).json({ message: "Session not found" });
  }

  res.clearCookie("refreshToken");
  res.status(200).json({ message: "Logout successfully" });
}

export async function verifyEmail(req, res) {
  const { otp, email } = req.body;

  const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

  const otpDoc = await OtpModel.findOne({
    email,
    otpHash,
    purpose: "email-verification",
  });

  if (!otpDoc) {
    return res.status(400).json({
      message: "Invalid OTP or wrong Otp",
    });
  }
  const expiryTime = otpDoc.createdAt.getTime() + 5 * 60 * 1000;
  if (expiryTime < Date.now()) {
    return res.status(400).json({ message: "OTP expired" });
  }

  const user = await UserModel.findByIdAndUpdate(
    otpDoc.user,
    { verified: true },
    { returnDocument: "after" },
  );
  await OtpModel.deleteMany({
    user: otpDoc.user,
  });

  return res.status(200).json({
    message: "Email verified successfully",
    user: {
      username: user.username,
      email: user.email,
      verified: user.verified,
      role: user.role,
    },
  });
}

export async function resendOtp(req, res) {
  const { email } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.verified) {
    return res.status(400).json({ message: "Email already verified" });
  }

  await OtpModel.deleteMany({ user: user._id });

  const otp = generateOtp();
  const html = getOtpHtml(otp);

  const otpHash = crypto.createHash("sha256").update(otp).digest("hex");
 try{

  await sendEmail(email, "OTP Verification", `Your OTP Code is ${otp}`, html);  
return res.status(200).json({ message: "OTP resent successfully" });
 }  catch (error) {

  console.error("error in sending otp to email",error.message);
  return res.status(500).json({
    message: "OTP could not be sent",
    error: error.message,
  });
 }


  await OtpModel.create({
    user: user._id,
    email,
    otpHash,
    purpose: "email-verification",
    createdAt: Date.now(),
  });

  return res.status(200).json({
    message: "OTP resent successfully",
  });
}
//forgot password
export async function forgotPassword(req, res) {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  await OtpModel.deleteMany({
    user: user._id,
    purpose: "password-reset",
  });

  const otp = generateOtp();
  const html = getOtpHtml(otp);

  const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

  
try {
  await sendEmail(
    email,
    "Password Reset OTP",
    `Your password reset OTP is ${otp}`,
    html,
  );
} catch (error) {
  console.error("Password reset email failed:", error.message);
  return res.status(500).json({
    message: "Password reset OTP could not be sent",
    error: error.message,
  });
}

  await OtpModel.create({
    user: user._id,
    email,
    otpHash,
    purpose: "password-reset",
    createdAt: Date.now(),
  });

  return res.status(200).json({
    message: "Password reset OTP sent successfully",
  });
}

export async function verifyResetOtp(req, res) {
  const { email, otp } = req.body;

  const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

  const otpDoc = await OtpModel.findOne({
    email,
    otpHash,
    purpose: "password-reset",
  });

  if (!otpDoc) {
    return res.status(400).json({ message: "Invalid OTP" });
  }
  const expiryTime = otpDoc.createdAt.getTime() + 5 * 60 * 1000;
  if (expiryTime < Date.now()) {
    return res.status(400).json({ message: "OTP expired" });
  }

  const resetToken = jwt.sign(
    {
      userId: otpDoc.user,
      purpose: "password-reset",
    },
    config.JWT_SECRET,
    {
      expiresIn: "10m",
    },
  );

  res.cookie("resetToken", resetToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 10 * 60 * 1000,
  });

  return res.status(200).json({
    message: "OTP verified successfully",
  });
}

export async function resetPassword(req, res) {
  const { newPassword, confirmPassword } = req.body;
  const resetToken = req.cookies.resetToken;

  if (newPassword !== confirmPassword) {
    return res.status(400).json({
      message: "New password and confirm password do not match",
    });
  }

 
let decoded;
try {
  decoded = jwt.verify(resetToken, config.JWT_SECRET);
} catch (error) {
  return res.status(403).json({ message: "Invalid or expired reset token" });
}


  if (decoded.purpose !== "password-reset") {
    return res.status(400).json({ message: "Invalid reset token" });
  }
  const hashPassword = await bcrypt.hash(newPassword, 10);

  await UserModel.findByIdAndUpdate(decoded.userId, {
    password: hashPassword,
  });

  await OtpModel.deleteMany({
    user: decoded.userId,
    purpose: "password-reset",
  });
// clear cookie after successful reset
res.clearCookie("resetToken");

  return res.status(200).json({
    message: "Password reset successfully",
  });
}

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id; 
    const { username, phoneNumber, branch } = req.body;

    // Find user and update data
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { username, phoneNumber, branch },
      { new: true, runValidators: true }
    ).select("-password"); // Never send password back!

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ success: false, message: "Server error updating profile" });
  }
};
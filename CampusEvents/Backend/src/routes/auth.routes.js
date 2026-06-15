import { Router } from "express";
import * as authController from '../controllers/auth.controller.js'
const   authRouter=Router();

// Register new user
authRouter.post('/register', authController.register);

// Login user
authRouter.post('/login', authController.login);

// Get current user info
authRouter.get('/me', authController.getMe);

// Refresh access token
authRouter.post('/refresh-token', authController.refreshToken);

// Logout from current session
authRouter.post('/logout', authController.logout);

// Logout from all sessions
authRouter.post('/logout-all', authController.logoutAll);

// Email verification
authRouter.post('/email/verify', authController.verifyEmail);

// Resend OTP
authRouter.post('/otp/resend', authController.resendOtp);

// Password reset flow
authRouter.post('/password/forgot', authController.forgotPassword);
authRouter.post('/password/verify-otp', authController.verifyResetOtp);
authRouter.post('/password/reset', authController.resetPassword);

export default authRouter
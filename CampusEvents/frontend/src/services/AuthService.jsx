import API from "./Api";
 

export const Login = (email, password) =>
  API.post("/auth/login", { email, password });

export const register = (username, email, password) =>
  API.post("/auth/register", { username, email, password });

export const verifyEmail = (email, otp) =>
  API.post("/auth/email/verify", { email, otp });

export const forgotPassword = (email) =>
  API.post("/auth/password/forgot", { email });

export const verifyResetOtp = (email, otp) =>
  API.post("/auth/password/verify-otp", { email, otp });

export const resetPassword = (newPassword, confirmPassword) =>
  API.post("/auth/password/reset", { newPassword, confirmPassword });

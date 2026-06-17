import React from 'react'
import { Routes , Route } from 'react-router-dom'
import Login from '../pages/auth/login'
import Signup from '../pages/auth/signup'
import ForgotPassword from '../pages/auth/ForgotPassword'
import ResetPassword from '../pages/auth/ResetPassword'
import VerifyEmail from '../pages/auth/VerifyEmail'
import VerifyResetOtp from '../pages/auth/VerifyResetOtp'

function AuthRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/verify-reset-otp" element={<VerifyResetOtp />} />
    </Routes>

  )
}

export default AuthRoutes
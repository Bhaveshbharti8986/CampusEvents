import { Routes,Route} from "react-router-dom";
import Login from "../pages/auth.page/login.jsx";
import Register from "../pages/auth.page/register.jsx";
import ForgotPassword from "../pages/auth.page/forgotPassword.jsx";
import VerifyEmail from "../pages/auth.page/verifyEmail.jsx";
import VerifyResetOtp from "../pages/auth.page/verifyResetOtp.jsx";
import ResetPassword from "../pages/auth.page/resetPassword.jsx";
import AuthLayout from "../components/layouts/AuthLayout.jsx";

export default function AuthRoutes() {
    return (
        <Routes >
            <Route path="/auth/login" element={<AuthLayout>
                <Login/>
            </AuthLayout>} />
            <Route path="/auth/register" element={
                <AuthLayout>
                <Register/>
            </AuthLayout>
        } />
            <Route path="/auth/verify-email" element={<AuthLayout><VerifyEmail/></AuthLayout>} />
            <Route path="/auth/forgot" element={
        <AuthLayout><ForgotPassword /></AuthLayout>} />
            <Route path="/auth/verify-reset" element={<AuthLayout><VerifyResetOtp /></AuthLayout>} />
            <Route path="/auth/reset-password" element={<AuthLayout><ResetPassword/></AuthLayout>} />
        </Routes>
    );
}
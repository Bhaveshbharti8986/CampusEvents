import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import InputField from "../../components/UI/InputField";
import GlassButton from "../../components/UI/GlassButton";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false); // <-- spinner state
  const navigate = useNavigate();

  const handleForgot = async (e) => {
    e.preventDefault();
    setLoading(true); // start spinner
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/password/forgot`, {
        email,
      });
      toast.success("Password reset OTP sent!");
      navigate("/auth/verify-reset-otp", { state: { email } });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send reset OTP");
    } finally {
      setLoading(false); // stop spinner
    }
  };

  if (loading) {
    return <LoadingSpinner text="Sending reset OTP..." size={32} />;
  }

  return (
    <form
      onSubmit={handleForgot}
       className="w-full h-full  p-4 flex flex-col gap-3 justify-between"
    >     
     <h1 className="text-gradient font-bold text-2xl">Forgot Password</h1>

      <InputField
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <GlassButton type="submit" variant="primary">
        Send OTP
      </GlassButton>
      <p className="mt-3 text-sm">
        <Link to="/auth/login" className="text-brand-accent hover:underline">
          Back to Login
        </Link>
      </p>
    </form>
  );
}

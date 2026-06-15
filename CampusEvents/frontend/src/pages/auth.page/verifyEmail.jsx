import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import OtpInput from "../../components/ui/OtpInput";
import Button from "../../components/ui/Button";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

export default function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const handleVerify = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:3301/api/auth/email/verify", { email, otp });
      toast.success("Email verified successfully!");
      navigate("/auth/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:3301/api/auth/otp/resend", { email });
      toast.success("OTP resent!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Resend failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner text="Processing OTP..." size={32} />;

  return (
    <div className="p-6 bg-white rounded shadow-md w-96">
      <h2 className="text-xl font-bold mb-4">Verify Email</h2>
      <OtpInput length={6} onChange={setOtp} />
      <Button onClick={handleVerify} variant="success">Verify OTP</Button>
      <Button onClick={handleResend} variant="primary">Resend OTP</Button>
      <p className="mt-3 text-sm">
        <Link to="/auth/login" className="text-blue-600">Login</Link>
      </p>
    </div>
  );
}

import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import OtpInput from "../../components/ui/OtpInput";
import GlassButton from "../../components/ui/GlassButton";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import ResendButton from "../../components/ui/RegisterButton";
export default function VerifyEmail() {
  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const handleVerify = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:3301/api/auth/email/verify", {
        email,
        otp,
      });
      toast.success("Email verified successfully!");
      navigate("/auth/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
      setButtonClicked(true);
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

  if (loading) return <LoadingSpinner text="Processing OTP..." />;

  return (
    <div className="w-full h-full  p-4 flex flex-col gap-3 justify-between">
      <h2 className="text-gradient font-extrabold text-3xl">Verify Email</h2>
      <OtpInput setOtp={setOtp} />
      <GlassButton onClick={handleVerify} variant="success">
          Verify OTP
        </GlassButton>
      <div className="mb-0 text-sm flex justify-between align-center">
        <Link to="/auth/login" className="text-brand-accent hover:underline">
          Login
        </Link>
      <button onClick={handleResend} className="text-brand-accent hover:underline" > Resend OTP</button>
      </div >
    </div>
  );
}

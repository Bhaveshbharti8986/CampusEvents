import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import OtpInput from "../../components/ui/OtpInput";
import Button from "../../components/ui/Button";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

export default function VerifyResetOtp() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const handleVerify = async () => {
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:3301/api/auth/password/verify-otp",
        { email, otp },
        { withCredentials: true }
      );
      toast.success("OTP verified, now reset password");
      navigate("/auth/reset-password");
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner text="Verifying OTP..." size={32} />;

  return (
    <div className="p-6 bg-white rounded shadow-md w-96">
      <h2 className="text-xl font-bold mb-4">Verify Reset OTP</h2>
      <OtpInput length={6} onChange={setOtp} />
      <Button onClick={handleVerify} variant="success">Verify OTP</Button>
    </div>
  );
}

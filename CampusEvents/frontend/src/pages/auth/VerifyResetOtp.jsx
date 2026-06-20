import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import OtpInput from "../../components/UI/OtpInput";
import GlassButton from "../../components/UI/GlassButton";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { Link } from "react-router-dom";
export default function VerifyResetOtp() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const handleVerify = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      return toast.error("Please enter all 6 digits");
    }

    setLoading(true); // Spinner turns on
    console.log(otp);
    try {
   
      await axios.post(
`${import.meta.env.VITE_API_URL}/api/auth/password/verify-otp`,
        { email, otp },
        { withCredentials: true },
      );
      toast.success("OTP verified, now reset password");
      // ONLY navigate if the verification was actually successful
      navigate("/auth/reset-password");
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed");
    } finally {
      // ONLY turn off the loading spinner here. Never navigate inside finally.
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner text="Verifying OTP..." />;

  return (
    <form
      onSubmit={handleVerify}
      className="w-full h-full p-4 flex flex-col gap-4 justify-between"
    >
      <div className="mb-2">
        <h1 className="text-gradient font-extrabold text-3xl">Enter OTP</h1>

        <p className="text-text-muted mt-2 text-sm  text-center wrap-text">
          We sent a 6-digit code to{" "}
          <span className="text-brand-accent break-all">
            {email || "your email"}
          </span>
        </p>
      </div>

      <OtpInput setOtp={setOtp} />

      {/* Added type="submit" so the form knows this triggers the onSubmit function */}
      <GlassButton type="submit">Verify OTP</GlassButton>
      <p className="mt-3 text-sm">
        <Link to="/auth/forgot-password" className="text-brand-accent hover:underline">
          Back 
        </Link>
      </p>
    </form>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import InputField from "../../components/ui/InputField";
import GlassButton from "../../components/ui/GlassButton";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
       ` ${import.meta.env.VITE_API_URL}/api/auth/password/reset`,
        { newPassword, confirmPassword },
        { withCredentials: true },
      );
      toast.success("Password reset successful!");
      navigate("/auth/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner text="Resetting password..." />;

  return (
    <form
      onSubmit={handleReset}
      className="w-full h-full  p-4 flex flex-col gap-3 justify-between"
    >
      <h2 className="text-gradient font-bold text-2xl">Reset Password</h2>
      <InputField
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="New Password"
      />
      <InputField
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
      />
      <GlassButton type="submit" variant="success">
        Reset Password
      </GlassButton>
      <p className="mt-3 text-sm">
        <a href="/auth/login" className="text-brand-accent hover:underline">
          Back to Login
        </a>
      </p>
    </form>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
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
        "http://localhost:3301/api/auth/password/reset",
        { newPassword, confirmPassword },
        { withCredentials: true }
      );
      toast.success("Password reset successful!");
      navigate("/auth/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner text="Resetting password..." size={32} />;

  return (
    <form onSubmit={handleReset} className="p-6 bg-white rounded shadow-md w-96">
      <h2 className="text-xl font-bold mb-4">Reset Password</h2>
      <Input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="New Password"
      />
      <Input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
      />
      <Button type="submit" variant="success">Reset Password</Button>
      <p className="mt-3 text-sm">
        <a href="/auth/login" className="text-blue-600">Back to Login</a>
      </p>
    </form>
  );
}

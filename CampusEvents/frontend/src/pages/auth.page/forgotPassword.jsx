import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false); // <-- spinner state
  const navigate = useNavigate();

  const handleForgot = async (e) => {
    e.preventDefault();
    setLoading(true); // start spinner
    try {
      await axios.post("http://localhost:3301/api/auth/password/forgot", { email });
      toast.success("Password reset OTP sent!");
      navigate("/auth/verify-reset", { state: { email } });
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
    <form onSubmit={handleForgot} className="p-6 bg-white rounded shadow-md w-96">
      <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
      <Input
        type="email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        placeholder="Email"
      />
      <Button type="submit" variant="primary">Send OTP</Button>
      <p className="mt-3 text-sm">
        <Link to="/auth/login" className="text-blue-600">Back to Login</Link>
      </p>
    </form>
  );
}

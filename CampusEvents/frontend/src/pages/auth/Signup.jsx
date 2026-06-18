import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import InputField from "../../components/ui/InputField";
import GlassButton from "../../components/ui/GlassButton";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        username,
        email,
        password,
      });
      toast.success("User registered, please check email for OTP");
      navigate("/auth/verify-email", { state: { email } });
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner text="Registering user..." />;

  return (
    <form
      onSubmit={handleRegister}
      className="w-full h-full  p-4 flex flex-col gap-3 justify-between"
    >
      <h1 className="text-gradient font-bold text-2xl">Register</h1>
      <InputField
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <InputField
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <InputField
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <GlassButton type="submit" variant="primary">
        Signup
      </GlassButton>
      <p className="mt-3 text-sm">
        <Link to="/auth/login" className="text-brand-accent hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
}

export default Signup;

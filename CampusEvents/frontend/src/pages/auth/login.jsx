import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/ui/InputField";
import GlassButton from "../../components/ui/GlassButton";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handeleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3301/api/auth/login",
        { email, password },
        { withCredentials: true },
      );
      localStorage.setItem("accessToken", res.data.accessToken);
      toast.success("Login successful");
        navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
    
      setLoading(false);
    }
  };
  if (Loading) {
    return <LoadingSpinner text="Logging in..." />;
  }
  return (
    <form
      onSubmit={handeleLogin}
      className="w-full h-full  p-4 flex flex-col gap-3 justify-between"
    >
      <h1 className="text-gradient font-bold text-2xl">Login</h1>

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
        Login
      </GlassButton>
      <div className="mt-3 text-sm flex justify-between">
        <Link to="/auth/signup" className="text-brand-accent hover:underline">
          Sign Up
        </Link>
        <Link to="/auth/forgot-password" className="text-brand-accent hover:underline">
          Forgot Password
        </Link>
      </div>
    </form>
  );
}

export default Login;

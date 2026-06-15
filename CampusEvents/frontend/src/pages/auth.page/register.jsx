import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:3301/api/auth/register", { username, email, password });
      toast.success("User registered, please check email for OTP");
      navigate("/auth/verify-email", { state: { email } });
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner text="Registering user..." size={32} />;

  return (
    <form onSubmit={handleRegister} className="p-6 bg-white rounded shadow-md w-96">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <Input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Username" />
      <Input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" />
      <Input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
      <Button type="submit" variant="primary">Register</Button>
      <p className="mt-3 text-sm">
        <Link to="/auth/login" className="text-blue-600">Login</Link>
      </p>
    </form>
  );
}

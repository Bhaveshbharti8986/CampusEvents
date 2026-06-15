import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { Link } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3301/api/auth/login", { email, password }, { withCredentials: true });
      localStorage.setItem("accessToken", res.data.accessToken);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner text="Signing you in..." size={32} />;

  return (
    <form onSubmit={handleLogin} className="p-6 bg-white rounded-2xl shadow-lg  w-80">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <Input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" />
      <Input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
      <Button type="submit" variant="primary">Login</Button>
       <div className="mt-3 text-sm flex justify-between">
            <Link to="/auth/register" className="text-blue-600">Register</Link>
            <Link to="/auth/forgot" className="text-blue-600">Forgot Password</Link>
          </div >
    </form>
  );
}

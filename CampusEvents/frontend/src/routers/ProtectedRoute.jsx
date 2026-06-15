import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/ui/LoadingSpinner";

export default function ProtectedRoute({ children }) {
  const [isValid, setIsValid] = useState(null); // null = loading, true/false = result
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsValid(false);
        return;
      }
      try {
        await axios.get("http://localhost:3301/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setIsValid(true);
      } catch (err) {
        toast.error("Session expired, please login again");
        localStorage.removeItem("accessToken");
        setIsValid(false);
      }
    };
    validateToken();
  }, [token]);

  // While checking token, show lucide spinner
  if (isValid === null) {
    return (
      <LoadingSpinner text="Validating session..." />
    );
  }

  // If invalid, redirect to login
  if (!isValid) {
    return <Navigate to="/auth/login" replace />;
  }

  // Otherwise, render the protected page
  return children;
}

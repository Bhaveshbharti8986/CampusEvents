import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../components/ui/LoadingSpinner";

function ProtectedRoute({ children, redirectPath }) {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const validateToken = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        setIsAuthorized(false);
        return;
      }

      try {
        const response = await axios.get(
          "${import.meta.env.VITE_API_URL}/api/auth/me",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        if (response.status === 200) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        console.error("Session expired or invalid");
        setIsAuthorized(false);
      }
    };
    validateToken();
  }, []);

  // 1. Still waiting for the backend to reply? Show your glowing spinner.
  if (isAuthorized === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner text="Verifying session..." />
      </div>
    );
  }
  return isAuthorized ? children : <Navigate to={redirectPath} />;
}

export default ProtectedRoute;

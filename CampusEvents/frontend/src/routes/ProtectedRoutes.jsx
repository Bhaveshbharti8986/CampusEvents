import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../components/UI/LoadingSpinner"; // Make sure this path is correct

function ProtectedRoute({ children, redirectPath = "/auth/login", allowedRoles }) {
  // We use an object to track both loading state and authorization status
  const [authStatus, setAuthStatus] = useState({ loading: true, isAuthorized: false, roleMismatch: false });

  useEffect(() => {
    const validateToken = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        setAuthStatus({ loading: false, isAuthorized: false, roleMismatch: false });
        return;
      }

      try {
        // FIXED: Changed double quotes to backticks for proper template literals
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          // Extract the user's role from your backend response
          // Adjust response.data.data.role if your backend sends it differently!
          const userRole = response.data.data?.role || response.data.user?.role || response.data.role;

          // If allowedRoles is provided, check if the user has permission
          if (allowedRoles && !allowedRoles.includes(userRole)) {
            setAuthStatus({ loading: false, isAuthorized: false, roleMismatch: true });
          } else {
            setAuthStatus({ loading: false, isAuthorized: true, roleMismatch: false });
          }
        } else {
          setAuthStatus({ loading: false, isAuthorized: false, roleMismatch: false });
        }
      } catch (error) {
        console.error("Session expired or invalid");
        setAuthStatus({ loading: false, isAuthorized: false, roleMismatch: false });
      }
    };
    validateToken();
  }, [allowedRoles]);

  if (authStatus.loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner text="Verifying permissions..." />
      </div>
    );
  }

  // If they are logged in but tried to access an Admin page as a Student
  if (authStatus.roleMismatch) {
    return <Navigate to="/events" replace />;
  }

  // If they aren't logged in at all, send them to login
  return authStatus.isAuthorized ? children : <Navigate to={redirectPath} replace />;
}

export default ProtectedRoute;

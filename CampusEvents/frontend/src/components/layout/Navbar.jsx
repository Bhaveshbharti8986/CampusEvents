import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Bell } from "lucide-react";
import RegisterButton from "../ui/RegisterButton";
import Sidebar from "./Sidebar";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { useAuth } from "../../context/AuthContext";
export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate();
   const { isLogin, user, setIsLogin, setUser } = useAuth();
 
  const handleLogout = async () => {
  
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`,
        {},
        { withCredentials: true },
      );
    } catch (error) {
      console.error("Logout error", error);
    } finally {
      localStorage.removeItem("accessToken");
      setIsLogin(false);
      setUser(null);
      setIsSidebarOpen(false);
      navigate("/");
    }
  };
 console.log("navbar","isLogin",isLogin,"user",user);

  return (
    <>
      <nav className="sticky top-0 z-40 w-full mb-10">
        <div className="glass-panel flex items-center justify-between px-3 lg:px-6 mt-2 py-2 mx-auto">
          <div onClick={() => navigate("/")}>
            <h1 className="text-2xl font-extrabold text-gradient tracking-tight cursor-pointer">
              CollegeEvents
            </h1>
          </div>

          <div>
            {isLogin && user ? (
              <div className="flex gap-6 justify-end items-center">
                <Bell
                  className="text-text-muted hover:text-brand-accent cursor-pointer transition-colors"
                  size={24}
                />
                <div
                  onClick={() => setIsSidebarOpen(true)}
                  className="rounded-full w-10 h-10 bg-gradient-to-r from-brand-primary to-brand-accent flex items-center justify-center text-white font-bold text-lg shadow-glow-primary cursor-pointer border border-white/10 hover:scale-105 transition-all uppercase"
                >
                  {user.username?.charAt(0)}
                </div>
              </div>
            ) : (
              <div className="flex gap-2 justify-end items-center">
                <RegisterButton
                  onClick={() =>  navigate("/auth/login") }
                  className="!bg-transparent border-none shadow-none hover:!bg-glass-hover text-text-muted hover:text-white"
                >
                  Login
                </RegisterButton>

                <RegisterButton
                  onClick={() => {
                    navigate("/auth/signup");
                
                  }}
                >
                  Sign Up
                </RegisterButton>
              </div>
            )}
          </div>
        </div>
      </nav>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onLogout={handleLogout}
        user={user}
      />
    </>
  );
}

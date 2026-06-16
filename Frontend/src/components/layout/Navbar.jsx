

import React, { useState } from "react";
import RegisterButton from "../ui/RegisterButton";
import Sidebar from "./Sidebar"; // <-- Import your new component
import { Bell } from "lucide-react";

export default function Navbar() {
  // Authentication State
  const [isLogin, setIsLogin] = useState(false);
  // Sidebar State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Helper function to handle full logout
  const handleLogout = () => {
    setIsLogin(false);
    setIsSidebarOpen(false); // Close sidebar when logging out
  };

  return (
    <>
      <nav className="sticky top-0 z-40 w-full mb-10 ">
        <div className="glass-panel flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          
          <div>
            <h1 className="text-2xl font-extrabold text-gradient tracking-tight cursor-pointer">
              CollegeEvents
            </h1>
          </div>

          <div>
            {isLogin ? (
              <div className="flex gap-6 justify-end items-center">
                <Bell className="text-text-muted hover:text-brand-accent cursor-pointer transition-colors" size={24} />
                
                {/* Clicking Avatar now opens the Sidebar */}
                <div 
                  onClick={() => setIsSidebarOpen(true)}
                    className="rounded-full w-10 h-10 bg-gradient-to-r from-brand-primary to-brand-secondary flex items-center justify-center text-white font-bold text-lg shadow-glow-primary cursor-pointer border border-white/10 hover:scale-105 transition-all"
                >
                  B
                </div>
              </div>
            ) : (
              <div className="flex gap-4 justify-end items-center">
                <RegisterButton 
                  onClick={() => setIsLogin(true)} 
                  className="bg-transparent border-none shadow-none hover:bg-glass-hover text-text-muted hover:text-white"
                >
                  Login
                </RegisterButton>
                
                <RegisterButton onClick={() => setIsLogin(true)}>
                  Sign Up
                </RegisterButton>
              </div>
            )} 
          </div>
        </div>
      </nav>

      {/* Render the Sidebar globally. It's hidden unless isSidebarOpen is true */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onLogout={handleLogout}
      />
    </>
  );
}
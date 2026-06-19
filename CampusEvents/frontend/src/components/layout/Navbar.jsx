import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import { 
  Home, Compass, LayoutDashboard, 
  Award, CalendarDays, PlusCircle // Added new icons for specific roles
} from "lucide-react";
import NotificationBell from "../features/NotificationBell";
import RegisterButton from "../ui/RegisterButton";
import Sidebar from "./Sidebar";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
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

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* =========================================
          1. TOP NAVBAR (Desktop & Mobile Header)
          ========================================= */}
      <nav className="fixed top-0 z-40 w-full mb-10">
        <div className="glass-panel flex items-center justify-between px-4 lg:px-6 mt-4 py-3 mx-auto max-w-7xl rounded-full border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          
          {/* LEFT: Futuristic Logo */}
          <div onClick={() => navigate("/")} className="flex items-center gap-2 group cursor-pointer shrink-0">
            
           <h1 className="text-gradient font-bold text-3xl">CampusEvents</h1>
          </div>

          {/* CENTER: Desktop Navigation (Hidden on Mobile) */}
          <div className="hidden md:flex items-center space-x-2 bg-black/20 p-1 rounded-full border border-white/5">
            
            {/* Home is visible to everyone */}
            <Link
              to="/"
              className={`flex items-center gap-2 px-5 py-2 rounded-full transition-all duration-300 ${
                isActive('/') 
                  ? 'bg-brand-primary/20 text-brand-accent shadow-[inset_0_0_10px_rgba(34,211,238,0.3)] border border-brand-accent/30' 
                  : 'text-text-muted hover:text-white hover:bg-white/5'
              }`}
            >
              <Home size={18} />
              <span className="font-medium text-sm tracking-wide">Home</span>
            </Link>

            {/* ROLE-BASED RENDERING */}
            {user?.role === 'admin' ? (
              // --- ADMIN LINKS ---
              <>
                <Link
                  to="/admin/dashboard"
                  className={`flex items-center gap-2 px-5 py-2 rounded-full transition-all duration-300 ${
                    isActive('/admin/dashboard') ? 'bg-brand-primary/20 text-brand-accent shadow-[inset_0_0_10px_rgba(34,211,238,0.3)] border border-brand-accent/30' : 'text-text-muted hover:text-white hover:bg-white/5'
                  }`}
                >
                  <LayoutDashboard size={18} />
                  <span className="font-medium text-sm tracking-wide">Dashboard</span>
                </Link>
                <Link
                  to="/admin/events"
                  className={`flex items-center gap-2 px-5 py-2 rounded-full transition-all duration-300 ${
                    isActive('/admin/events') ? 'bg-brand-primary/20 text-brand-accent shadow-[inset_0_0_10px_rgba(34,211,238,0.3)] border border-brand-accent/30' : 'text-text-muted hover:text-white hover:bg-white/5'
                  }`}
                >
                  <CalendarDays size={18} />
                  <span className="font-medium text-sm tracking-wide">Manage Events</span>
                </Link>
                <Link
                  to="/admin/create-event"
                  className={`flex items-center gap-2 px-5 py-2 rounded-full transition-all duration-300 ${
                    isActive('/admin/create-event') ? 'bg-brand-primary/20 text-brand-accent shadow-[inset_0_0_10px_rgba(34,211,238,0.3)] border border-brand-accent/30' : 'text-text-muted hover:text-white hover:bg-white/5'
                  }`}
                >
                  <PlusCircle size={18} />
                  <span className="font-medium text-sm tracking-wide">Create Event</span>
                </Link>
              </>
            ) : (
              // --- STUDENT / PUBLIC LINKS ---
              <>
                <Link
                  to="/events"
                  className={`flex items-center gap-2 px-5 py-2 rounded-full transition-all duration-300 ${
                    isActive('/events') ? 'bg-brand-primary/20 text-brand-accent shadow-[inset_0_0_10px_rgba(34,211,238,0.3)] border border-brand-accent/30' : 'text-text-muted hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Compass size={18} />
                  <span className="font-medium text-sm tracking-wide">Explore</span>
                </Link>

                {isLogin && user && (
                  <>
                    <Link
                      to="/student/dashboard"
                      className={`flex items-center gap-2 px-5 py-2 rounded-full transition-all duration-300 ${
                        isActive('/student/dashboard') ? 'bg-brand-primary/20 text-brand-accent shadow-[inset_0_0_10px_rgba(34,211,238,0.3)] border border-brand-accent/30' : 'text-text-muted hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <LayoutDashboard size={18} />
                      <span className="font-medium text-sm tracking-wide">Dashboard</span>
                    </Link>
                    <Link
                      to="/student/certificates"
                      className={`flex items-center gap-2 px-5 py-2 rounded-full transition-all duration-300 ${
                        isActive('/student/certificates') ? 'bg-brand-primary/20 text-brand-accent shadow-[inset_0_0_10px_rgba(34,211,238,0.3)] border border-brand-accent/30' : 'text-text-muted hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Award size={18} />
                      <span className="font-medium text-sm tracking-wide">Certificates</span>
                    </Link>
                  </>
                )}
              </>
            )}
          </div>

          {/* RIGHT: Auth & Profile */}
          <div className="shrink-0">
            {isLogin && user ? (
              <div className="flex gap-4 md:gap-6 justify-end items-center">
                <NotificationBell />
                <div
                  onClick={() => setIsSidebarOpen(true)}
                  className="rounded-full w-10 h-10 bg-gradient-to-r from-brand-primary to-brand-accent flex items-center justify-center text-white font-bold text-lg cursor-pointer border border-white/20 hover:scale-110 transition-transform shadow-[0_0_15px_rgba(139,92,246,0.6)] uppercase relative"
                >
                  {user.username?.charAt(0)}
                  {/* Futuristic scanning line effect inside avatar */}
                  <div className="absolute inset-0 bg-white/20 w-full h-[2px] animate-scan rounded-full blur-[1px]"></div>
                </div>
              </div>
            ) : (
              <div className="flex gap-2 justify-end items-center">
                <RegisterButton
                  onClick={() => navigate("/auth/login")}
                  className="!bg-transparent border-none shadow-none hover:!bg-glass-hover text-text-muted hover:text-brand-accent transition-colors"
                >
                  Login
                </RegisterButton>

                <RegisterButton
                  onClick={() => navigate("/auth/signup")}
                  className="rounded-full shadow-[0_0_10px_rgba(34,211,238,0.4)] border border-brand-accent/50"
                >
                  Sign Up
                </RegisterButton>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* =========================================
          2. FUTURISTIC MOBILE BOTTOM DOCK (Hidden on Desktop)
          ========================================= */}
      <div className="md:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[90%] max-w-[350px] z-40 glass-panel rounded-full flex justify-around items-center py-2 px-4 border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.8),0_0_15px_rgba(139,92,246,0.3)] backdrop-blur-2xl">
        
        {/* Home is visible to everyone */}
        <Link to="/" className="relative p-3 flex flex-col items-center group">
          <div className={`absolute inset-0 rounded-full transition-all duration-300 ${isActive('/') ? 'bg-brand-accent/20 scale-100 blur-sm' : 'scale-0'}`}></div>
          <Home size={22} className={`relative z-10 transition-colors ${isActive('/') ? 'text-brand-accent' : 'text-text-muted group-hover:text-white'}`} />
        </Link>

        {/* ROLE-BASED MOBILE RENDERING */}
        {user?.role === 'admin' ? (
          // --- ADMIN MOBILE LINKS ---
          <>
            <Link to="/admin/dashboard" className="relative p-3 flex flex-col items-center group">
              <div className={`absolute inset-0 rounded-full transition-all duration-300 ${isActive('/admin/dashboard') ? 'bg-brand-accent/20 scale-100 blur-sm' : 'scale-0'}`}></div>
              <LayoutDashboard size={22} className={`relative z-10 transition-colors ${isActive('/admin/dashboard') ? 'text-brand-accent' : 'text-text-muted group-hover:text-white'}`} />
            </Link>
            <Link to="/admin/events" className="relative p-3 flex flex-col items-center group">
              <div className={`absolute inset-0 rounded-full transition-all duration-300 ${isActive('/admin/events') ? 'bg-brand-accent/20 scale-100 blur-sm' : 'scale-0'}`}></div>
              <CalendarDays size={22} className={`relative z-10 transition-colors ${isActive('/admin/events') ? 'text-brand-accent' : 'text-text-muted group-hover:text-white'}`} />
            </Link>
            <Link to="/admin/create-event" className="relative p-3 flex flex-col items-center group">
              <div className={`absolute inset-0 rounded-full transition-all duration-300 ${isActive('/admin/create-event') ? 'bg-brand-accent/20 scale-100 blur-sm' : 'scale-0'}`}></div>
              <PlusCircle size={22} className={`relative z-10 transition-colors ${isActive('/admin/create-event') ? 'text-brand-accent' : 'text-text-muted group-hover:text-white'}`} />
            </Link>
          </>
        ) : (
          // --- STUDENT / PUBLIC MOBILE LINKS ---
          <>
            <Link to="/events" className="relative p-3 flex flex-col items-center group">
              <div className={`absolute inset-0 rounded-full transition-all duration-300 ${isActive('/events') ? 'bg-brand-accent/20 scale-100 blur-sm' : 'scale-0'}`}></div>
              <Compass size={22} className={`relative z-10 transition-colors ${isActive('/events') ? 'text-brand-accent' : 'text-text-muted group-hover:text-white'}`} />
            </Link>

            {isLogin && user && (
              <>
                <Link to="/student/dashboard" className="relative p-3 flex flex-col items-center group">
                  <div className={`absolute inset-0 rounded-full transition-all duration-300 ${isActive('/student/dashboard') ? 'bg-brand-accent/20 scale-100 blur-sm' : 'scale-0'}`}></div>
                  <LayoutDashboard size={22} className={`relative z-10 transition-colors ${isActive('/student/dashboard') ? 'text-brand-accent' : 'text-text-muted group-hover:text-white'}`} />
                </Link>
                <Link to="/student/certificates" className="relative p-3 flex flex-col items-center group">
                  <div className={`absolute inset-0 rounded-full transition-all duration-300 ${isActive('/student/certificates') ? 'bg-brand-accent/20 scale-100 blur-sm' : 'scale-0'}`}></div>
                  <Award size={22} className={`relative z-10 transition-colors ${isActive('/student/certificates') ? 'text-brand-accent' : 'text-text-muted group-hover:text-white'}`} />
                </Link>
              </>
            )}
          </>
        )}
      </div>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onLogout={handleLogout}
        user={user}
      />
    </>
  );
}
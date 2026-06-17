import React from "react";
import { X, Ticket, Award, Settings, LogOut, UserRound } from "lucide-react";

export default function Sidebar({ isOpen, onClose, onLogout }) {
  return (
    <>
      {/* BACKGROUND OVERLAY: Clicks here will close the sidebar */}
      <div 
        onClick={onClose}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-60 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* THE SIDEBAR PANEL */}
      <div 
        className={`fixed top-0 right-0 h-full w-80 bg-bg-surface/80 backdrop-blur-2xl border-l border-glass-border shadow-[-10px_0_30px_rgba(0,0,0,0.5)] z-70 transform transition-transform duration-400 cubic-bezier(0.4, 0, 0.2, 1) flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* HEADER: Close Button */}
        <div className="flex justify-between items-center p-6 border-b border-white/5">
          <h2 className="text-xl font-bold text-white">My Account</h2>
          <button 
            onClick={onClose} 
            className="text-text-muted hover:text-brand-accent hover:rotate-90 transition-all duration-300"
          >
            <X size={24} />
          </button>
        </div>

        {/* USER INFO SECTION */}
        <div className="p-6 border-b border-white/5 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-brand-primary flex items-center justify-center mb-4 shadow-glow-primary border-2 border-brand-accent/50">
            <UserRound size={40} className="text-white" />
          </div>
          <h3 className="text-xl font-bold text-white">Bhavesh</h3>
          <p className="text-text-muted text-sm">B.Tech • 1st Year</p>
          <span className="mt-2 px-3 py-1 bg-brand-accent/20 text-brand-accent text-xs font-bold uppercase rounded-full border border-brand-accent/30">
            Student
          </span>
        </div>

        {/* NAVIGATION LINKS */}
        <div className="flex flex-col flex-1 p-4 gap-2 mt-2 ">

          <SidebarLink  icon={<Ticket size={20} />} text="My Tickets" badge="2" />
          <SidebarLink icon={<Award size={20} />} text="Certificate Vault" />
          <SidebarLink icon={<Settings size={20} />} text="Profile Settings" />
        </div>

        {/* FOOTER: Logout Button */}
        <div className="p-6 border-t border-white/5">
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl  bg-brand-primary hover:bg-brand-hover text-white hover:shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all duration-300 font-semibold"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

// A tiny helper component just to keep the links clean and reusable
function SidebarLink({ icon, text }) {
  return (
    <div className=" glass-panel-interactive flex items-center justify-between p-3 rounded-xl hover:bg-glass-hover text-text-muted hover:text-white transition-all duration-300 cursor-pointer border border-transparent hover:border-glass-border">
      <div className="flex items-center gap-3 font-medium">
        <span className="text-brand-accent">{icon}</span>
        {text}
      </div>
    
    </div>
  );
}
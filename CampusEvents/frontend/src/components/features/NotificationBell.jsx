import React, { useState, useEffect, useRef } from 'react';
import { Bell, Ticket, Award, Info, CheckCircle2 } from 'lucide-react';

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Simulated notification data
  const [notifications, setNotifications] = useState([
    { 
      id: 1, 
      type: 'ticket', 
      title: 'Ticket Confirmed!', 
      message: 'Your registration for CodeRed Hackathon 2026 is successful. View your ticket for the QR code.', 
      time: '2 mins ago', 
      isRead: false 
    },
    { 
      id: 2, 
      type: 'award', 
      title: 'New Certificate Issued', 
      message: 'Your certificate for "React UI Masterclass" is now available in your vault.', 
      time: '1 hour ago', 
      isRead: false 
    },
    { 
      id: 3, 
      type: 'system', 
      title: 'System Maintenance', 
      message: 'The campus platform will be down for 15 minutes tonight at 2 AM.', 
      time: 'Yesterday', 
      isRead: true 
    }
  ]);

  // Calculate unread count dynamically
  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Handle clicking outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    // Only attach the listener if the dropdown is open
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

  // Helper to render the correct glowing icon based on notification type
  const getIcon = (type) => {
    switch(type) {
      case 'ticket': return <Ticket size={18} className="text-brand-accent" />;
      case 'award': return <Award size={18} className="text-green-400" />;
      default: return <Info size={18} className="text-brand-primary" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      
      {/* 1. The Bell Icon Button */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="relative cursor-pointer p-2 rounded-full hover:bg-white/5 transition-colors group"
      >
        <Bell 
          size={22} 
          className={`transition-colors ${isOpen ? 'text-brand-accent' : 'text-text-muted group-hover:text-brand-accent'}`} 
        />
        
        {/* Glowing Unread Indicator */}
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-2 w-2.5 h-2.5 bg-brand-accent rounded-full border-2 border-bg-surface animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
        )}
      </div>

      {/* 2. The Glassmorphism Dropdown Panel */}
      {isOpen && (
       
        <div className="absolute right-0 mt-3 w-80 md:w-96 bg-bg-surface rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] z-[100] overflow-hidden origin-top-right animate-fade-in border border-white/10 backdrop-blur-sm">
          
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
            <h3 className="font-bold text-white flex items-center gap-2">
              Notifications
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 bg-brand-accent/20 text-brand-accent text-xs rounded-full border border-brand-accent/30">
                  {unreadCount} New
                </span>
              )}
            </h3>
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                className="text-xs text-text-muted hover:text-brand-accent flex items-center gap-1 transition-colors"
              >
                <CheckCircle2 size={14} /> Mark all read
              </button>
            )}
          </div>
          
          {/* Notification List */}
          <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-text-muted">
                <Bell size={32} className="mx-auto mb-3 opacity-20" />
                <p>You're all caught up!</p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div 
                  key={notif.id}
                  onClick={() => markAsRead(notif.id)}
                  className={`p-4 border-b border-white/5 transition-all cursor-pointer flex gap-4 ${
                    notif.isRead 
                      ? 'opacity-70 hover:opacity-100 hover:bg-white/5' 
                      : 'bg-brand-primary/10 hover:bg-brand-primary/20 relative'
                  }`}
                >
                  {/* Neon unread indicator line */}
                  {!notif.isRead && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-accent shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
                  )}

                  {/* Icon Circle */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-1 border ${
                    notif.isRead ? 'bg-white/5 border-white/10' : 'bg-bg-deep border-brand-accent/30 shadow-[inset_0_0_15px_rgba(34,211,238,0.2)]'
                  }`}>
                    {getIcon(notif.type)}
                  </div>

                  {/* Text Content */}
                  <div className="flex-grow">
                    <p className={`text-sm font-semibold mb-1 ${notif.isRead ? 'text-gray-300' : 'text-white'}`}>
                      {notif.title}
                    </p>
                    <p className="text-xs text-text-muted leading-relaxed line-clamp-2">
                      {notif.message}
                    </p>
                    <span className="text-[10px] font-mono text-gray-500 mt-2 block">
                      {notif.time}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
          
          {/* Footer */}
          <div className="p-3 text-center border-t border-white/10 bg-black/20 hover:bg-white/5 cursor-pointer transition-colors group">
            <span className="text-sm font-medium text-text-muted group-hover:text-white transition-colors">
              View all history
            </span>
          </div>

        </div>
      )}
    </div>
  );
}
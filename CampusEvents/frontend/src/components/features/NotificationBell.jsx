import React, { useState, useEffect, useRef } from 'react';
import { Bell, Ticket, Award, Info, CheckCircle2, AlertTriangle, InboxIcon } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dropdownRef = useRef(null);

  const { user } = useAuth();

  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/notification/getall`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data.success) {
        
          setNotifications(response.data.data);
        }
      } catch (error) {
        console.error("Failed to load notifications", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) fetchNotifications();
  }, [isOpen]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsOpen(false);
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    //we can add api call to mark all notifications as read to backend later
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const getIcon = (type) => {
    switch(type) {
      case 'event': return <Ticket size={18} className="text-brand-accent" />;
      case 'alert': return <AlertTriangle size={18} className="text-red-600 " />;
      case 'info': return  <InboxIcon size={18} className="text-brand-primary" />;
      default: return <Info size={18} className="text-brand-primary" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
  
      <div onClick={() => setIsOpen(!isOpen)} className="relative cursor-pointer p-2 rounded-full hover:bg-white/5 transition-colors group">
        <Bell size={22} className={`transition-colors ${isOpen ? 'text-brand-accent' : 'text-text-muted group-hover:text-brand-accent'}`} />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-2 w-2.5 h-2.5 bg-brand-accent rounded-full border-2 border-bg-surface animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
        )}
      </div>

      {/* Dropdown Panel */}
      { isOpen && (
        <div className="absolute right-0 mt-3 w-80 md:w-96 bg-bg-surface rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] z-[100] overflow-hidden border border-white/10 backdrop-blur-sm">
          <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
            <h3 className="font-bold text-white flex items-center gap-2">
              Notifications
              {unreadCount > 0 && <span className="px-2 py-0.5 bg-brand-accent/20 text-brand-accent text-xs rounded-full border border-brand-accent/30">{unreadCount} New</span>}
            </h3>
            {unreadCount > 0 && (
              <button onClick={markAllAsRead} className="text-xs text-text-muted hover:text-brand-accent flex items-center gap-1 transition-colors">
                <CheckCircle2 size={14} /> Mark all read
              </button>
            )}
          </div>
          
          <div className="max-h-[400px] overflow-y-scroll">
            {isLoading ? <div className="p-8 text-center text-text-muted">Loading...</div> : 
             notifications.length === 0 ? <div className="p-8 text-center text-text-muted">You're all caught up!</div> :
             notifications.map((notif) => (
              <div key={notif.id} onClick={() => markAsRead(notif.id)} className={`p-4 border-b border-white/5 transition-all cursor-pointer flex gap-4 ${notif.isRead ? 'opacity-70 hover:opacity-100 hover:bg-white/5' : 'bg-brand-primary/10 hover:bg-brand-primary/20 relative'}`}>
                {!notif.isRead && <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-accent shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-1 border ${notif.isRead ? 'bg-white/5 border-white/10' : 'bg-bg-deep border-brand-accent/30 shadow-[inset_0_0_15px_rgba(34,211,238,0.2)]'}`}>
                  {getIcon(notif.type)}
                </div>
                <div className="flex-grow">
                  <p className={`text-sm font-semibold mb-1 ${notif.isRead ? 'text-gray-300' : 'text-white'}`}>{notif.title}</p>
                  <p className="text-xs text-text-muted leading-relaxed line-clamp-2">{notif.message}</p>
                  <span className="text-[10px] font-mono text-gray-500 mt-2 block">{notif.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
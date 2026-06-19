import React, { useState, useEffect } from 'react';
import { 
  MapPin, CalendarDays, QrCode, UserRound, 
  Phone, Mail, Loader2, Ticket 
} from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

export default function MyTickets() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        // Reusing the dashboard API because it already sends populated registrations!
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/events/student/dashboard`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (response.data.success) {
          setTickets(response.data.registrations);
        }
      } catch (error) {
        console.error("Failed to load tickets", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-28 flex flex-col items-center justify-center text-brand-accent">
        <Loader2 className="animate-spin mb-4" size={40} />
        <p>Generating your passes...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-12 px-4 md:px-6 max-w-6xl mx-auto animate-fade-in">
      
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gradient">My Event Passes</h1>
        <div className="bg-brand-primary/20 text-brand-accent px-4 py-2 rounded-full border border-brand-accent/30 font-bold flex items-center gap-2">
          <Ticket size={18} /> Total Tickets: {tickets.length}
        </div>
      </div>

      {tickets.length === 0 ? (
        <div className="glass-panel p-12 text-center rounded-2xl">
          <Ticket size={48} className="mx-auto text-gray-500 mb-4 opacity-50" />
          <h2 className="text-xl font-bold text-white mb-2">No tickets found</h2>
          <p className="text-text-muted">You haven't registered for any events yet.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {tickets.map((reg) => {
            const event = reg.event;
            if (!event) return null; // Fallback if event was deleted from DB

            return (
              <div key={reg._id} className="glass-panel-interactive flex flex-col lg:flex-row rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                
                {/* 1. Attendee Info Side (Left) */}
                <div className="p-6 md:p-8 bg-black/40 lg:w-1/3 border-b lg:border-b-0 lg:border-r border-gray-700">
                  <div className="flex items-center gap-4 mb-6">
                    {/* Avatar */}
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center text-white text-2xl font-bold border-2 border-bg-deep shadow-glow-primary uppercase">
                      {user?.username?.charAt(0) || 'S'}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white capitalize">{user?.username || 'Student Name'}</h3>
                      <span className="text-xs font-bold bg-brand-accent/20 text-brand-accent px-2 py-1 rounded uppercase">
                        {reg.isTeamRegistration ? 'Team Lead' : 'Participant'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-text-muted">
                      <Mail size={16} className="text-gray-400 shrink-0" />
                      <span className="truncate">{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-text-muted">
                      <Phone size={16} className="text-gray-400 shrink-0" />
                      <span>{reg.mobile || 'No mobile provided'}</span>
                    </div>
                    {reg.isTeamRegistration && (
                      <div className="flex items-center gap-3 text-sm text-brand-accent mt-4 p-3 bg-brand-accent/10 rounded-lg border border-brand-accent/20">
                        <UserRound size={16} />
                        <span className="font-bold">Team: {reg.teamName}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* 2. Event Info Side (Middle) */}
                <div className="p-6 md:p-8 flex-grow border-b lg:border-b-0 lg:border-r border-dashed border-gray-500 relative bg-gradient-to-br from-transparent to-white/5">
                  {/* CSS Cutouts for real ticket look */}
                  <div className="hidden lg:block absolute -top-4 -right-4 w-8 h-8 bg-bg-deep rounded-full"></div>
                  <div className="hidden lg:block absolute -bottom-4 -right-4 w-8 h-8 bg-bg-deep rounded-full"></div>
                  
                  <span className="text-brand-accent text-xs font-bold uppercase tracking-wider mb-2 block">
                    {event.category} Event
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                    {event.title}
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-gray-300">
                      <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center shrink-0">
                        <CalendarDays size={18} className="text-brand-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-text-muted font-medium uppercase">Date & Time</p>
                        <p className="font-medium">
                          {new Date(event.dateTime).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 text-gray-300">
                      <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center shrink-0">
                        <MapPin size={18} className="text-brand-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-text-muted font-medium uppercase">Venue</p>
                        <p className="font-medium">{event.location}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. QR Code Side (Right) */}
                <div className="p-6 md:p-8 flex flex-col items-center justify-center min-w-[220px] bg-black/40 relative">
                  <div className="w-32 h-32 bg-white rounded-xl flex items-center justify-center mb-4 p-2 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                    {/* In a real app, you would use a library like 'qrcode.react' here */}
                    <QrCode size={110} className="text-black" />
                  </div>
                  <p className="text-text-muted text-xs font-mono uppercase tracking-widest mb-1">Pass ID</p>
                  <p className="text-white text-lg font-bold font-mono tracking-wider mb-3">{reg.registrationId}</p>
                  
                  <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                    reg.status === 'confirmed' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 
                    reg.status === 'cancelled' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 
                    'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                  }`}>
                    {reg.status}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
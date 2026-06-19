import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Calendar, Ticket, Award, ArrowRight, Loader2, MapPin } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function StudentDashboard() {
  const { user } = useAuth();
  
  const [stats, setStats] = useState({ upcoming: 0, attended: 0, certificates: 0 });
  const [registrations, setRegistrations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/events/student/dashboard`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (response.data.success) {
          setStats(response.data.stats);
          setRegistrations(response.data.registrations);
        }
      } catch (error) {
        console.error("Failed to load student dashboard", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-28 flex flex-col items-center justify-center text-brand-accent">
        <Loader2 className="animate-spin mb-4" size={40} />
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-12 px-4 md:px-6 max-w-7xl mx-auto animate-fade-in">
      
      {/* Welcome Banner */}
      <div className="glass-panel-Rounded p-8 mb-8 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand-primary rounded-full mix-blend-screen filter blur-[80px] opacity-40"></div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 relative z-10">
          Welcome back, <span className="text-brand-accent capitalize">{user?.username || 'Student'}</span>!
        </h1>
        <p className="text-text-muted relative z-10">Here is what's happening with your campus events.</p>
      </div>

      {/* Quick Stats (Real Data) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="glass-panel p-6 rounded-2xl flex items-center gap-4 border-l-4 border-l-brand-accent">
          <div className="w-12 h-12 rounded-full bg-brand-accent/20 flex items-center justify-center text-brand-accent">
            <Ticket size={24} />
          </div>
          <div>
            <p className="text-text-muted text-sm font-medium">Upcoming Events</p>
            <h3 className="text-2xl font-bold text-white">{stats.upcoming}</h3>
          </div>
        </div>
        
        <div className="glass-panel p-6 rounded-2xl flex items-center gap-4 border-l-4 border-l-brand-primary">
          <div className="w-12 h-12 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary">
            <Calendar size={24} />
          </div>
          <div>
            <p className="text-text-muted text-sm font-medium">Events Attended</p>
            <h3 className="text-2xl font-bold text-white">{stats.attended}</h3>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl flex items-center gap-4 border-l-4 border-l-green-400">
          <div className="w-12 h-12 rounded-full bg-green-400/20 flex items-center justify-center text-green-400">
            <Award size={24} />
          </div>
          <div>
            <p className="text-text-muted text-sm font-medium">Certificates Earned</p>
            <h3 className="text-2xl font-bold text-white">{stats.certificates}</h3>
          </div>
        </div>
      </div>

      {/* Your Registered Events List */}
      <h2 className="text-2xl font-bold text-white mb-6">Your Registered Events</h2>
      
      {registrations.length === 0 ? (
        <div className="glass-panel p-10 rounded-2xl text-center">
          <p className="text-gray-400 mb-4">You haven't registered for any events yet.</p>
          <Link to="/events" className="inline-flex px-6 py-3 bg-brand-primary hover:bg-brand-hover text-white font-bold rounded-xl transition-all shadow-glow-primary">
            Explore Events
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {registrations.map((reg) => {
            const event = reg.event;
            // Handle edge case where event might have been deleted by admin
            if (!event) return null; 

            const isUpcoming = new Date(event.dateTime) > new Date();

            return (
              <Link 
                key={reg._id} 
                to={`/events/${event._id}`} 
                className="glass-panel p-4 md:p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6 hover:bg-white/5 transition-all group border border-transparent hover:border-brand-accent/30"
              >
                {/* Event Cover Image */}
                <div className="w-full md:w-48 h-32 bg-gray-800 rounded-xl overflow-hidden shrink-0 relative">
                  <img 
                    src={event.coverImageUrl || 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070'} 
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 text-[10px] font-bold rounded uppercase backdrop-blur-md ${isUpcoming ? 'bg-green-500/80 text-white' : 'bg-gray-500/80 text-white'}`}>
                      {isUpcoming ? 'Upcoming' : 'Past'}
                    </span>
                  </div>
                </div>

                {/* Event Details */}
                <div className="flex-grow w-full">
                  <span className="text-xs font-bold bg-brand-primary/20 text-brand-accent px-3 py-1 rounded-full mb-3 inline-block border border-brand-accent/30 uppercase">
                    {event.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-accent transition-colors">
                    {event.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-text-muted text-sm mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} /> 
                      {new Date(event.dateTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={14} /> {event.location}
                    </span>
                    <span className="flex items-center gap-1 text-brand-primary">
                      <Ticket size={14} /> {reg.registrationId}
                    </span>
                  </div>
                </div>

                {/* Action Arrow */}
                <div className="shrink-0 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white/5 group-hover:bg-brand-primary/20 group-hover:text-brand-accent transition-colors">
                  <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
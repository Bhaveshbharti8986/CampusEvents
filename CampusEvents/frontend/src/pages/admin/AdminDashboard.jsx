import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  Users, CalendarPlus, BarChart3, QrCode, Plus, 
  MoreVertical, ShieldCheck, UsersRound, Loader2
} from 'lucide-react';

export default function AdminDashboard() {
  // 1. Real Data States
  const [stats, setStats] = useState({
    activeEvents: 0,
    totalStudents: 0,
    totalRegistrations: 0
  });
  const [recentRegistrations, setRecentRegistrations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 2. Fetch Data on Mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/events/admin/stats`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (response.data.success) {
          setStats(response.data.stats);
          setRecentRegistrations(response.data.recentRegistrations);
        }
      } catch (error) {
        console.error("Failed to load dashboard data", error);
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
        <p>Loading Live Dashboard Data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-12 px-4 md:px-6 max-w-7xl mx-auto">
      
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            Admin Control Center
            <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs font-bold uppercase rounded-full border border-red-500/30 flex items-center gap-1">
              <ShieldCheck size={14} /> System Admin
            </span>
          </h1>
          <p className="text-text-muted">Manage campus events, verify tickets, and organize student teams.</p>
        </div>
        
        {/* Primary Action Button */}
        <Link 
          to="/admin/create-event" 
          className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-primary hover:bg-brand-hover text-white rounded-xl font-bold transition-all shadow-glow-primary"
        >
          <Plus size={20} />
          Create New Event
        </Link>
      </div>

      {/* Analytics Overview Grid - Now using real stats state */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard icon={<CalendarPlus />} title="Active Events" value={stats.activeEvents} color="brand-accent" />
        <StatCard icon={<Users />} title="Total Students" value={stats.totalStudents} color="brand-primary" />
        <StatCard icon={<BarChart3 />} title="Registrations" value={stats.totalRegistrations} color="green-400" />
        {/* Hardcoded 0 for scanned tickets until QR scanner is built */}
        <StatCard icon={<QrCode />} title="Tickets Scanned" value="0" color="orange-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Workspace (Takes up 2 columns) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Quick Tools Panel */}
          <div className="glass-panel-Rounded p-6 border-l-4 border-l-brand-accent">
            <h2 className="text-xl font-bold text-white mb-4">Event Management Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link to="/admin/manage-teams" className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-brand-accent/20 flex items-center justify-center text-brand-accent group-hover:scale-110 transition-transform">
                  <UsersRound size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-white">Manage Teams</h3>
                  <p className="text-xs text-text-muted">Group students for Hackathons</p>
                </div>
              </Link>
              
              <Link to="/admin/scan" className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-orange-400/20 flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform">
                  <QrCode size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-white">QR Scanner</h3>
                  <p className="text-xs text-text-muted">Check-in students at the door</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Recent Registrations Table - Now mapped to database data */}
          <div className="glass-panel-Rounded p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Recent Registrations</h2>
              <span className="text-brand-accent text-sm cursor-pointer hover:underline">View All</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-text-muted border-b border-gray-700">
                    <th className="pb-3 font-medium">Student Name</th>
                    <th className="pb-3 font-medium">Event</th>
                    <th className="pb-3 font-medium text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {recentRegistrations.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="py-6 text-center text-gray-500">
                        No registrations found.
                      </td>
                    </tr>
                  ) : (
                    recentRegistrations.map((reg) => (
                      <tr key={reg._id} className="border-b border-gray-800 hover:bg-white/5 transition-colors">
                        <td className="py-4 text-white font-medium">
                          {reg.user?.username || 'Unknown Student'}
                          {/* Showing the mobile number we collected in the new form */}
                          <div className="text-xs text-gray-500 mt-1">{reg.mobile || 'No mobile provided'}</div>
                        </td>
                        <td className="py-4 text-gray-300">
                          {reg.event?.title || 'Event Deleted'}
                          {/* Showing team name if they checked the team box */}
                          {reg.isTeamRegistration && (
                            <div className="text-xs text-brand-accent mt-1">Team: {reg.teamName}</div>
                          )}
                        </td>
                        <td className="py-4 text-right">
                          <span className={`px-2 py-1 rounded text-xs font-bold capitalize ${
                            reg.status === 'confirmed' ? 'bg-green-500/20 text-green-400' :
                            reg.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
                            'bg-brand-accent/20 text-brand-accent'
                          }`}>
                            {reg.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Live Events (Kept Static for now until QR scanner is built) */}
        <div className="lg:col-span-1">
          <div className="glass-panel-Rounded p-6 sticky top-28">
            <h2 className="text-xl font-bold text-white mb-6">Live Events</h2>
            
            <div className="space-y-4">
              <div className="p-4 border border-brand-accent/30 bg-brand-accent/5 rounded-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-2 h-2 bg-brand-accent rounded-full m-4 animate-ping"></div>
                <h3 className="text-white font-bold mb-1">CodeRed Hackathon</h3>
                <p className="text-xs text-text-muted mb-3">Main Auditorium • 150 Attendees</p>
                
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-text-muted mb-1">
                    <span>Checked In</span>
                    <span>0 / 150</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-accent w-[0%] rounded-full"></div>
                  </div>
                </div>

                <Link to="/admin/scan" className="w-full py-2 bg-glass-base border border-gray-600 hover:border-brand-accent text-white text-sm rounded-lg transition-colors flex items-center justify-center gap-2">
                  <QrCode size={16} /> Open Scanner
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// Small helper component for the admin stat cards
function StatCard({ icon, title, value, color }) {
  const colorMap = {
    'brand-accent': 'text-brand-accent bg-brand-accent/20 border-brand-accent',
    'brand-primary': 'text-brand-primary bg-brand-primary/20 border-brand-primary',
    'green-400': 'text-green-400 bg-green-400/20 border-green-400',
    'orange-400': 'text-orange-400 bg-orange-400/20 border-orange-400',
  };

  return (
    <div className="glass-panel p-6 rounded-2xl flex items-center gap-4 hover:scale-105 transition-transform cursor-pointer">
      <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 border border-opacity-30 ${colorMap[color]}`}>
        {React.cloneElement(icon, { size: 28 })}
      </div>
      <div>
        <p className="text-text-muted text-sm font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-white">{value}</h3>
      </div>
    </div>
  );
}
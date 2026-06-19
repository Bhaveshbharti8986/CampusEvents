import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, Plus, Edit, Trash2, Eye, 
  MoreVertical, Calendar, MapPin, ArrowLeft
} from 'lucide-react';

export default function ManageEvents() {
  const navigate = useNavigate();

  // Simulated Database of Events
  const [events, setEvents] = useState([
    {
      id: "EVT-001",
      title: "CodeRed Hackathon 2026",
      date: "Oct 15, 2026",
      category: "Hackathon",
      status: "Upcoming",
      registered: 112,
      capacity: 150,
      price: 0
    },
    {
      id: "EVT-002",
      title: "React UI Masterclass",
      date: "Nov 05, 2026",
      category: "Workshop",
      status: "Upcoming",
      registered: 45,
      capacity: 50,
      price: 499
    },
    {
      id: "EVT-003",
      title: "Annual Cultural Fest",
      date: "Sept 10, 2026",
      category: "Cultural",
      status: "Completed",
      registered: 850,
      capacity: 1000,
      price: 0
    }
  ]);

  // Helper function for status badge colors
  const getStatusBadge = (status) => {
    switch(status) {
      case 'Upcoming':
        return 'bg-brand-accent/20 text-brand-accent border-brand-accent/30';
      case 'Ongoing':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Completed':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default:
        return 'bg-white/10 text-white border-white/20';
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-6 max-w-7xl mx-auto">
      
      {/* Header Area */}
      <div className="mb-8">
        <button 
          onClick={() => navigate('/admin/dashboard')}
          className="flex items-center gap-2 text-text-muted hover:text-brand-accent transition-colors mb-4"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Manage Events</h1>
            <p className="text-text-muted">View, edit, and monitor all campus events.</p>
          </div>
          <Link 
            to="/admin/create-event" 
            className="flex items-center gap-2 px-5 py-2.5 bg-brand-primary hover:bg-brand-hover text-white rounded-xl font-bold transition-all shadow-glow-primary"
          >
            <Plus size={18} />
            Create New Event
          </Link>
        </div>
      </div>

      {/* Toolbar: Search & Filters */}
      <div className="glass-panel-Rounded p-4 mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search size={18} className="absolute left-3 top-3.5 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search events by title..." 
            className="w-full bg-bg-surface border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-brand-accent transition-colors"
          />
        </div>
        <select className="bg-bg-surface border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent min-w-[150px]">
          <option value="all">All Status</option>
          <option value="upcoming">Upcoming</option>
          <option value="completed">Completed</option>
        </select>
        <select className="bg-bg-surface border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent min-w-[150px]">
          <option value="all">All Categories</option>
          <option value="hackathon">Hackathon</option>
          <option value="workshop">Workshop</option>
          <option value="cultural">Cultural</option>
        </select>
      </div>

      {/* Events Table */}
      <div className="glass-panel-Rounded overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white/5 border-b border-gray-700">
              <tr className="text-text-muted text-sm uppercase tracking-wider">
                <th className="p-4 font-medium">Event Details</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Registrations</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {events.map((event) => (
                <tr key={event.id} className="border-b border-gray-800 hover:bg-white/5 transition-colors group">
                  
                  {/* Event Title & Category */}
                  <td className="p-4">
                    <div className="font-bold text-white text-base mb-1">{event.title}</div>
                    <div className="text-xs text-brand-accent">{event.category}</div>
                  </td>

                  {/* Date */}
                  <td className="p-4 text-gray-300">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-gray-500" />
                      {event.date}
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(event.status)}`}>
                      {event.status}
                    </span>
                  </td>

                  {/* Registrations / Capacity */}
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${event.registered >= event.capacity ? 'bg-red-500' : 'bg-brand-accent'}`}
                          style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-gray-400 text-xs font-mono">
                        {event.registered}/{event.capacity}
                      </span>
                    </div>
                  </td>

                  {/* Actions Dropdown/Buttons */}
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors" title="View Public Page">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-brand-accent bg-white/5 hover:bg-brand-accent/20 rounded-lg transition-colors" title="Edit Event">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-400 bg-white/5 hover:bg-red-500/20 rounded-lg transition-colors" title="Delete Event">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination (Visual Only for now) */}
        <div className="p-4 border-t border-gray-800 flex items-center justify-between text-sm text-gray-400">
          <span>Showing 1 to 3 of 12 events</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-700 rounded hover:bg-white/5 disabled:opacity-50">Prev</button>
            <button className="px-3 py-1 border border-gray-700 rounded hover:bg-white/5 disabled:opacity-50">Next</button>
          </div>
        </div>
      </div>

    </div>
  );
}
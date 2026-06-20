import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  ArrowLeft,
  Edit2,
  View,
} from "lucide-react";
import axios from "axios"; 

export default function ManageEvents() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch events from backend
  const fetchEvents = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/events`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setEvents(response.data.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Delete handler
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      const token = localStorage.getItem("accessToken");
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/events/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchEvents(); // Refresh list
      } catch (error) {
        console.error("Delete error:", error);
        alert("Failed to delete event: Unauthorized or Server Error.");
      }
    }
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "upcoming":
        return "bg-brand-accent/20 text-brand-accent border-brand-accent/30";
      case "ongoing":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "completed":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      default:
        return "bg-white/10 text-white border-white/20";
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Manage Events</h1>
        </div>
        <Link
          to="/admin/create-event"
          className="flex items-center gap-2 px-5 py-2.5 bg-brand-primary text-white rounded-xl font-bold"
        >
          <Plus size={18} /> Create New Event
        </Link>
      </div>

      {/* Events Table */}
      <div className="glass-panel-Rounded overflow-scroll">
        {loading ? (
          <p className="p-8 text-white">Loading events...</p>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-white/5 border-b border-gray-700">
              <tr className="text-text-muted text-sm uppercase">
                <th className="p-4">Event Details</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4">Capacity</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr
                  key={event._id}
                  className="border-b border-gray-800 hover:bg-white/5"
                >
                  <td className="p-4">
                    <div className="font-bold text-white">{event.title}</div>
                    <div className="text-xs text-brand-accent">
                      {event.category}
                    </div>
                  </td>
                  <td className="p-4 text-gray-300">
                    {new Date(event.dateTime).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(event.status)}`}
                    >
                      {event.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="w-24 h-2 bg-gray-800 rounded-full">
                      <div
                        className="h-full bg-brand-accent rounded-full"
                        style={{
                          width: `${((event.totalSeats - event.availableSeats) / event.totalSeats) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-gray-400 text-xs">
                      {event.totalSeats - event.availableSeats}/
                      {event.totalSeats}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                     <button 
                      onClick={() => navigate(`/events/${event._id}`)}
                      className="p-2 text-yellow-50 hover:bg-yellow-500/20 rounded-lg"
                    >
                    <View size={16} />
                    </button>
                    <button
                      onClick={() => navigate(`/admin/edit-event/${event._id}`)}
                      className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

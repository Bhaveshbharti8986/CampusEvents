import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  Calendar, MapPin, Image as ImageIcon, Type, 
  DollarSign, Users, AlignLeft, ArrowLeft, Loader2 
} from 'lucide-react';

export default function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '', category: '', dateTime: '', location: '',
    coverImageUrl: '', price: 0, totalSeats: 0, description: ''
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/events/${id}`);
        const event = response.data.data;
        setFormData({
          ...event,
          dateTime: new Date(event.dateTime).toISOString().slice(0, 16),
        });
        setLoading(false);
      } catch (error) {
        alert("Failed to load event data");
        navigate("/admin/manage-events");
      }
    };
    fetchEvent();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    const token = localStorage.getItem("accessToken");
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/events/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Event updated successfully!");
      navigate("/admin/manage-events");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update event.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="text-white p-20 text-center">Loading...</div>;

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-6 max-w-4xl mx-auto">
      <button onClick={() => navigate('/admin/manage-events')} className="flex items-center gap-2 text-text-muted hover:text-brand-accent transition-colors mb-6">
        <ArrowLeft size={20} /> Back to Manage Events
      </button>

      <h1 className="text-3xl font-bold text-white mb-8">Edit Event</h1>

      <form onSubmit={handleSubmit} className="glass-panel-Rounded p-6 md:p-8 space-y-8">
        {error && <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">{error}</div>}

        {/* Row 1: Title & Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">Event Title</label>
            <div className="relative">
              <Type size={18} className="absolute left-3 top-3.5 text-gray-500" />
              <input type="text" name="title" value={formData.title} required onChange={handleChange} className="w-full bg-bg-surface border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white focus:border-brand-accent outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">Category</label>
            <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-bg-surface border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-brand-accent outline-none">
              <option value="tech">Technology & Hackathons</option>
              <option value="cultural">Cultural Fest</option>
              <option value="sports">Sports</option>
              <option value="workshop">Workshop / Seminar</option>
            </select>
          </div>
        </div>

        {/* Row 2: Date & Time & Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">Date & Time</label>
            <div className="relative">
              <Calendar size={18} className="absolute left-3 top-3.5 text-gray-500" />
              <input type="datetime-local" name="dateTime" value={formData.dateTime} required onChange={handleChange} className="w-full bg-bg-surface border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white focus:border-brand-accent outline-none" style={{ colorScheme: 'dark' }} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">Location</label>
            <div className="relative">
              <MapPin size={18} className="absolute left-3 top-3.5 text-gray-500" />
              <input type="text" name="location" value={formData.location} required onChange={handleChange} className="w-full bg-bg-surface border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white focus:border-brand-accent outline-none" />
            </div>
          </div>
        </div>

        {/* Row 3: Image */}
        <div>
          <label className="block text-sm font-medium text-text-muted mb-2">Cover Image URL</label>
          <div className="relative">
            <ImageIcon size={18} className="absolute left-3 top-3.5 text-gray-500" />
            <input type="url" name="coverImageUrl" value={formData.coverImageUrl} onChange={handleChange} className="w-full bg-bg-surface border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white focus:border-brand-accent outline-none" />
          </div>
        </div>

        {/* Row 4: Seats & Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-800 pt-6">
          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">Total Seats</label>
            <div className="relative">
              <Users size={18} className="absolute left-3 top-3.5 text-gray-500" />
              <input type="number" name="totalSeats" value={formData.totalSeats} required onChange={handleChange} className="w-full bg-bg-surface border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white focus:border-brand-accent outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">Price (₹)</label>
            <div className="relative">
              <DollarSign size={18} className="absolute left-3 top-3.5 text-gray-500" />
              <input type="number" name="price" value={formData.price} required onChange={handleChange} className="w-full bg-bg-surface border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white focus:border-brand-accent outline-none" />
            </div>
          </div>
        </div>

        {/* Row 5: Description */}
        <div>
          <label className="block text-sm font-medium text-text-muted mb-2">Description</label>
          <textarea name="description" value={formData.description} required rows="4" onChange={handleChange} className="w-full bg-bg-surface border border-gray-700 rounded-xl p-4 text-white focus:border-brand-accent outline-none"></textarea>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button type="submit" disabled={isSubmitting} className="px-8 py-3 bg-brand-primary hover:bg-brand-hover text-white rounded-xl font-bold transition-all flex items-center gap-2">
            {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : 'Update Event'}
          </button>
        </div>
      </form>
    </div>
  );
}
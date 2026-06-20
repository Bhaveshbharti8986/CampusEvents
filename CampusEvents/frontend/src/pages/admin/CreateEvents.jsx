import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Make sure axios is imported!
import { 
  Calendar, MapPin, Image as ImageIcon, Type, 
  DollarSign, Users, AlignLeft, ArrowLeft, CheckCircle, Loader2 
} from 'lucide-react';

export default function CreateEvent() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState(''); // Added to show backend errors

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    category: 'tech',
    dateTime: '',
    location: '',
    coverImageUrl: '',
    price: 0,
    totalSeats: 100,
    description: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
   
      const token = localStorage.getItem("accessToken");
      
      if (!token) {
        setError("You must be logged in as an admin.");
        setIsSubmitting(false);
        return;
      }

      
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/events/create`, 
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      
      if (response.data.success) {
        setShowSuccess(true);
        setTimeout(() => navigate('/admin/dashboard'), 2000);
      }
      
    } catch (err) {
      console.error("Failed to create event:", err);
     
      setError(err.response?.data?.message || "Failed to publish event. Are you an Admin?");
    } finally {
      setIsSubmitting(false);
    }
  };



  if (showSuccess) {
    return (
      <div className="min-h-screen pt-28 pb-12 flex items-center justify-center px-4">
        <div className="glass-panel-Rounded p-10 flex flex-col items-center text-center max-w-md w-full animate-fade-in border border-green-500/30">
          <CheckCircle size={64} className="text-green-400 mb-4 animate-pulse" />
          <h2 className="text-2xl font-bold text-white mb-2">Event Created!</h2>
          <p className="text-text-muted">The event is now live on the platform.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-6 max-w-4xl mx-auto">
      
      <button 
        onClick={() => navigate('/admin/dashboard')}
        className="flex items-center gap-2 text-text-muted hover:text-brand-accent transition-colors mb-6"
      >
        <ArrowLeft size={20} />
        Back to Dashboard
      </button>

      <h1 className="text-3xl font-bold text-white mb-8">Create New Event</h1>

      <form onSubmit={handleSubmit} className="glass-panel-Rounded p-6 md:p-8 space-y-8">
        
      
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm font-medium">
            {error}
          </div>
        )}

    
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">Event Title</label>
            <div className="relative">
              <Type size={18} className="absolute left-3 top-3.5 text-gray-500" />
              <input 
                type="text" name="title" required onChange={handleChange}
                placeholder="e.g. CodeRed Hackathon"
                className="w-full bg-bg-surface border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">Category</label>
            <select 
              name="category" onChange={handleChange}
              className="w-full bg-bg-surface border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none transition-all appearance-none"
            >
              <option value="tech">Technology & Hackathons</option>
              <option value="cultural">Cultural Fest</option>
              <option value="sports">Sports</option>
              <option value="workshop">Workshop / Seminar</option>
            </select>
          </div>
        </div>

        {/* Row 2: Date & Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">Date & Time</label>
            <div className="relative">
              <Calendar size={18} className="absolute left-3 top-3.5 text-gray-500" />
              <input 
                type="datetime-local" name="dateTime" required onChange={handleChange}
                className="w-full bg-bg-surface border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none transition-all"
                style={{ colorScheme: 'dark' }} 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">Location</label>
            <div className="relative">
              <MapPin size={18} className="absolute left-3 top-3.5 text-gray-500" />
              <input 
                type="text" name="location" required onChange={handleChange}
                placeholder="e.g. Main Auditorium or 'Online'"
                className="w-full bg-bg-surface border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white focus:border-brand-accent outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Row 3: Image URL */}
        <div>
          <label className="block text-sm font-medium text-text-muted mb-2">Cover Image URL</label>
          <div className="relative">
            <ImageIcon size={18} className="absolute left-3 top-3.5 text-gray-500" />
            <input 
              type="url" name="coverImageUrl" onChange={handleChange}
              placeholder="https://images.unsplash.com/..."
              className="w-full bg-bg-surface border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white focus:border-brand-accent outline-none transition-all"
            />
          </div>
          {formData.coverImageUrl && (
            <div className="mt-4 w-full h-32 rounded-xl overflow-hidden border border-gray-700">
              <img src={formData.coverImageUrl} alt="Cover Preview" className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
            </div>
          )}
        </div>

        {/* Row 4: Seats & Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-800 pt-6">
          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">Total Seats</label>
            <div className="relative">
              <Users size={18} className="absolute left-3 top-3.5 text-gray-500" />
              <input 
                type="number" name="totalSeats" min="1" defaultValue={100} required onChange={handleChange}
                className="w-full bg-bg-surface border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white focus:border-brand-accent outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">Price (₹) - Leave 0 for Free</label>
            <div className="relative">
              <DollarSign size={18} className="absolute left-3 top-3.5 text-gray-500" />
              <input 
                type="number" name="price" min="0" defaultValue={0} required onChange={handleChange}
                className="w-full bg-bg-surface border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white focus:border-brand-accent outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Row 5: Description */}
        <div>
          <label className="block text-sm font-medium text-text-muted mb-2">Event Description</label>
          <div className="relative">
            <AlignLeft size={18} className="absolute left-3 top-3.5 text-gray-500" />
            <textarea 
              name="description" required rows="4" onChange={handleChange}
              placeholder="What will happen at this event?"
              className="w-full bg-bg-surface border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white focus:border-brand-accent outline-none transition-all resize-y"
            ></textarea>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`px-8 py-3 rounded-xl font-bold transition-all flex items-center justify-center min-w-[160px] ${
              isSubmitting 
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                : 'bg-brand-primary hover:bg-brand-hover text-white shadow-glow-primary'
            }`}
          >
            {isSubmitting ? <Loader2 className="animate-spin text-brand-accent" size={20} /> : 'Publish Event'}
          </button>
        </div>

      </form>
    </div>
  );
}
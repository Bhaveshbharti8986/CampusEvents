import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { 
  User, Phone, BookOpen, GraduationCap, 
  Users, CheckCircle2, ArrowLeft, Loader2 
} from 'lucide-react';

export default function EventRegistration() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [eventDetails, setEventDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: user?.username || '',
    mobile: '',
    branch: '',
    year: '',
    isTeamRegistration: false,
    teamName: '',
  });

  // Fetch basic event details just to show the title on this page
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/events/${eventId}`);
        setEventDetails(res.data.data);
      } catch (err) {
        setError('Failed to fetch event details.');
      }
    };
    if (eventId) fetchEvent();
  }, [eventId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('accessToken');
      
      // Post to our registration backend route
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/events/${eventId}/register`,
        formData, // Sending all the form data
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setSuccess(true);
        // Redirect to student dashboard after 2 seconds
        setTimeout(() => navigate('/student/dashboard'), 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen pt-28 pb-12 flex items-center justify-center px-4">
        <div className="glass-panel-Rounded p-10 flex flex-col items-center text-center max-w-md w-full animate-fade-in border border-green-500/30">
          <CheckCircle2 size={64} className="text-green-400 mb-4 animate-pulse" />
          <h2 className="text-2xl font-bold text-white mb-2">Registration Confirmed!</h2>
          <p className="text-text-muted">Your ticket has been secured. Redirecting to your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-6 max-w-3xl mx-auto">
      <button 
        onClick={() => navigate(`/events/${eventId}`)}
        className="flex items-center gap-2 text-text-muted hover:text-brand-accent transition-colors mb-6"
      >
        <ArrowLeft size={20} /> Back to Event
      </button>

      <div className="mb-8 border-b border-gray-800 pb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Complete Registration</h1>
        <p className="text-brand-accent font-medium">
          {eventDetails ? eventDetails.title : 'Loading event...'}
        </p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="glass-panel-Rounded p-6 md:p-8 space-y-6">
        
        {/* Personal Details Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">Full Name</label>
            <div className="relative">
              <User size={18} className="absolute left-3 top-3.5 text-gray-500" />
              <input type="text" name="name" value={formData.name} onChange={handleChange} required
                className="w-full bg-bg-surface border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white focus:border-brand-accent outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">Mobile Number</label>
            <div className="relative">
              <Phone size={18} className="absolute left-3 top-3.5 text-gray-500" />
              <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required
                className="w-full bg-bg-surface border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white focus:border-brand-accent outline-none"
              />
            </div>
          </div>
        </div>

        {/* Academic Details Row (Optional fields) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">Branch (Optional)</label>
            <div className="relative">
              <BookOpen size={18} className="absolute left-3 top-3.5 text-gray-500" />
              <input type="text" name="branch" value={formData.branch} onChange={handleChange} placeholder="e.g. CSE, IT, ECE"
                className="w-full bg-bg-surface border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white focus:border-brand-accent outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">Year of Study (Optional)</label>
            <div className="relative">
              <GraduationCap size={18} className="absolute left-3 top-3.5 text-gray-500" />
              <select name="year" value={formData.year} onChange={handleChange}
                className="w-full bg-bg-surface border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white focus:border-brand-accent outline-none appearance-none"
              >
                <option value="">Select Year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>
          </div>
        </div>

        {/* Team Registration Toggle */}
        <div className="border-t border-gray-800 pt-6 mt-6">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input 
              type="checkbox" 
              name="isTeamRegistration" 
              checked={formData.isTeamRegistration} 
              onChange={handleChange}
              className="w-5 h-5 rounded border-gray-600 text-brand-accent focus:ring-brand-accent bg-bg-surface"
            />
            <span className="text-white font-medium group-hover:text-brand-accent transition-colors">
              I am registering as a Team / Group
            </span>
          </label>

          {formData.isTeamRegistration && (
            <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-xl animate-fade-in">
              <label className="block text-sm font-medium text-text-muted mb-2">Team Name</label>
              <div className="relative">
                <Users size={18} className="absolute left-3 top-3.5 text-gray-500" />
                <input type="text" name="teamName" value={formData.teamName} onChange={handleChange} required={formData.isTeamRegistration} placeholder="Enter your team name..."
                  className="w-full bg-bg-surface border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white focus:border-brand-accent outline-none"
                />
              </div>
              <p className="text-xs text-gray-400 mt-2">
                * Note: Other members can join this team from their dashboard later.
              </p>
            </div>
          )}
        </div>

        <button type="submit" disabled={isLoading} className="w-full py-4 mt-6 bg-brand-primary hover:bg-brand-hover text-white font-bold rounded-xl transition-all shadow-glow-primary flex justify-center items-center">
          {isLoading ? <Loader2 className="animate-spin" size={24} /> : "Confirm Registration"}
        </button>
      </form>
    </div>
  );
}
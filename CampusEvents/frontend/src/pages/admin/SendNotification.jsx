import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SendNotification() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    type: 'info', // Default value
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("You must be logged in to perform this action.");
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/notification/create`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setSuccess("Notification sent successfully!");
        setTimeout(() => navigate('/admin/dashboard'), 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send notification");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-35  p-6 bg-bg-surface border border-white/10 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold text-gradient  mb-6">Send New Notification</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div>
          <label className="block text-sm text-text-muted mb-1">Title</label>
          <input
            name="title"
            required
            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-brand-accent outline-none"
            onChange={handleChange}
          />
        </div>

        {/* Type Select */}
        <div>
          <label className="block text-sm text-text-muted mb-1">Notification Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-brand-accent outline-none"
          >
            <option value="info" className='bg-yellow-500'>Info</option>
            <option value="alert " className='bg-yellow-500'>Alert</option>
            <option value="event" className='bg-yellow-500'>Event</option>
          </select>
        </div>

        {/* Message Input */}
        <div>
          <label className="block text-sm text-text-muted mb-1">Message</label>
          <textarea
            name="message"
            required
            rows="4"
            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-brand-accent outline-none"
            onChange={handleChange}
          />
        </div>

        {/* Error/Success Messages */}
        {error && <p className="text-red-400 text-sm">{error}</p>}
        {success && <p className="text-green-400 text-sm">{success}</p>}

        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full py-3 bg-brand-accent text-black font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isSubmitting ? 'Sending...' : 'Send Notification'}
        </button>
      </form>
    </div>
  );
}

export default SendNotification;
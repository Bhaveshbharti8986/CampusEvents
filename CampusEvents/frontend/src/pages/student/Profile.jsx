import React, { useState, useEffect } from 'react';
import { UserRound, Mail, Phone, BookOpen, Save, Loader2, CheckCircle, XCircle } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

export default function Profile() {
  const { user, setUser } = useAuth();
  
  // 1. Form State
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    branch: ''
  });
  
  // 2. UI States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // 3. Sync state with user data once it loads from context
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        phone: user.phone || '',
        branch: user.branch || ''
      });
    }
  }, [user]);

  // 4. Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 5. Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      const token = localStorage.getItem("accessToken");
      
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/auth/profile`, 
        formData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data.success) {
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
        
        // Update the global user context so the Navbar updates instantly
        if (setUser) {
          setUser({ ...user, ...response.data.user });
        }
      }
    } catch (error) {
      console.error("Profile update error:", error);
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to update profile.' 
      });
    } finally {
      setIsSubmitting(false);
      // Clear success message after 3 seconds
      setTimeout(() => {
        if (message.type === 'success') setMessage({ type: '', text: '' });
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-12 px-4 md:px-6 max-w-4xl mx-auto animate-fade-in">
      <h1 className="text-3xl font-bold text-white mb-8">Profile Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column: Avatar & Quick Info */}
        <div className="md:col-span-1">
          <div className="glass-panel-Rounded p-6 flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full bg-brand-primary flex items-center justify-center mb-4 shadow-glow-primary border-4 border-bg-deep relative overflow-hidden">
              <UserRound size={60} className="text-white relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            <h2 className="text-xl font-bold text-white capitalize">{user?.username || 'Student Name'}</h2>
            <p className="text-text-muted text-sm mb-4">{user?.email || 'student@college.edu'}</p>
            <span className="px-4 py-1 bg-brand-accent/20 text-brand-accent text-xs font-bold uppercase rounded-full border border-brand-accent/30">
              {user?.role === 'admin' ? 'System Admin' : 'Verified Student'}
            </span>
          </div>
        </div>

        {/* Right Column: Edit Form */}
        <div className="md:col-span-2">
          <div className="glass-panel-Rounded p-6 md:p-8">
            <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">Personal Information</h3>
            
            {/* Status Message Display */}
            {message.text && (
              <div className={`p-4 rounded-xl mb-6 flex items-center gap-3 border ${
                message.type === 'success' 
                  ? 'bg-green-500/10 border-green-500/30 text-green-400' 
                  : 'bg-red-500/10 border-red-500/30 text-red-400'
              }`}>
                {message.type === 'success' ? <CheckCircle size={20} /> : <XCircle size={20} />}
                <p className="text-sm font-medium">{message.text}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Username */}
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-2">Username</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserRound size={18} className="text-gray-500" />
                    </div>
                    <input 
                      type="text" 
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                      className="w-full bg-bg-surface border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors"
                    />
                  </div>
                </div>

                {/* Email (Disabled) */}
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-2">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={18} className="text-gray-500" />
                    </div>
                    <input 
                      type="email" 
                      value={user?.email || ''}
                      disabled
                      className="w-full bg-bg-surface border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-gray-500 cursor-not-allowed opacity-70"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-2">Phone Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone size={18} className="text-gray-500" />
                    </div>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 9876543210"
                      className="w-full bg-bg-surface border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors"
                    />
                  </div>
                </div>

                {/* College Branch */}
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-2">College Branch</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <BookOpen size={18} className="text-gray-500" />
                    </div>
                    <input 
                      type="text" 
                      name="branch"
                      value={formData.branch}
                      onChange={handleChange}
                      placeholder="e.g. Computer Science"
                      className="w-full bg-bg-surface border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-bold transition-all min-w-[180px] ${
                    isSubmitting 
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                      : 'bg-brand-primary hover:bg-brand-hover text-white shadow-glow-primary'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Saving...
                    </>
                  ) : (
                    <>
                      <Save size={18} /> Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
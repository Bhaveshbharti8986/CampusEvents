import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const EventDetails = () => {
  const { eventId } = useParams(); // Using eventId to match your AppRoutes.jsx parameter
  const navigate = useNavigate();
  
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Context se data nikalna
  const { isLogin, setLogin, user, setUser } = useAuth();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/events/${eventId}`);
        setEvent(response.data.data);
        setError('');
      } catch (err) {
        console.error(err);
        setError('Failed to load event details.');
      } finally {
        setIsLoading(false);
      }
    };

    if (eventId) fetchEventDetails();
  }, [eventId]);

  const handleRegistration = () => {
    if (!isLogin) {
      // User ko login par bhejo
      navigate('/auth/login', { state: { from: `/events/${eventId}` } });
      return;
    }
    
   
    // Student ko naye registration form par bhej do!
    navigate(`/student/register-event/${eventId}`);
  };

  // Loading UI
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-accent border-t-transparent rounded-full animate-spin drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
      </div>
    );
  }

  // Error UI
  if (error || !event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-3xl font-bold text-red-400 mb-4">Oops!</h2>
        <p className="text-gray-400 mb-6">{error || "Event not found."}</p>
        <button onClick={() => navigate('/events')} className="px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
          Back to Events
        </button>
      </div>
    );
  }

  // Main UI
  return (
    <div className="min-h-screen pt-24 pb-12 px-6 max-w-7xl mx-auto animate-fade-in">
      
      {/* Dynamic Cover Image Area */}
      <div 
        className="w-full h-[40vh] min-h-[300px] rounded-2xl mb-10 overflow-hidden glass-panel relative bg-cover bg-center"
        style={{ backgroundImage: `url(${event.coverImageUrl || 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070'})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex items-end p-8">
           <div>
             <span className="bg-brand-accent text-black px-3 py-1 text-sm font-bold rounded-full mb-3 inline-block uppercase">
               {event.category}
             </span>
             <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{event.title}</h1>
             <p className="text-gray-300 text-lg flex items-center gap-2">
                📍 {event.location}
             </p>
           </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-8">
          <section className="glass-panel-Rounded p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 border-b border-gray-700/50 pb-2">About the Event</h2>
            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
              {event.description}
            </p>
          </section>

          {/* Render Schedule only if it exists in the backend data */}
          {event.schedule && event.schedule.length > 0 && (
            <section className="glass-panel-Rounded p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4 border-b border-gray-700/50 pb-2">Schedule</h2>
              <ul className="space-y-4 text-gray-300">
                {event.schedule.map((item, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="text-brand-accent font-bold w-24 shrink-0">{item.time}</span>
                    <span>{item.task}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Right Column: Sticky Registration Ticket */}
        <div className="lg:col-span-1">
          <div className="glass-panel p-6 sticky top-24">
            <h3 className="text-xl font-bold mb-6 text-center">Registration Info</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between border-b border-gray-700/50 pb-2">
                <span className="text-gray-400">Price</span>
                <span className="font-bold text-white text-lg">
                  {event.price === 0 ? 'Free' : `₹${event.price}`}
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-700/50 pb-2">
                <span className="text-gray-400">Date</span>
                <span className="text-white text-right">
                  {new Date(event.dateTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-700/50 pb-2">
                <span className="text-gray-400">Venue</span>
                <span className="text-white text-right">{event.location}</span>
              </div>
              <div className="flex justify-between border-b border-gray-700/50 pb-2">
                <span className="text-gray-400">Seats Left</span>
                <span className={`font-bold ${event.availableSeats < 20 ? 'text-red-400' : 'text-brand-accent'}`}>
                  {event.availableSeats} / {event.totalSeats}
                </span>
              </div>
            </div>

            <button 
              onClick={handleRegistration}
              disabled={event.availableSeats === 0}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-colors 
                ${event.availableSeats === 0 
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                  : 'bg-brand-primary hover:bg-brand-hover text-white shadow-[0_0_15px_rgba(107,50,241,0.4)]'
                }`}
            >
              {event.availableSeats === 0 ? 'Registration Closed' : 'Register Now'}
            </button>
            
            {/* CORRECTLY PLACED INSIDE THE RETURN STATEMENT */}
            {!isLogin && (
              <p className="text-xs text-center text-gray-400 mt-4">
                You will be redirected to login.
              </p>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default EventDetails;
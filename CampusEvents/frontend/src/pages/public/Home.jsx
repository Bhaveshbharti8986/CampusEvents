import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Home = () => {
  const [trendingEvents, setTrendingEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/events?limit=3`);
        setTrendingEvents(res.data.data);
      } catch (error) {
        console.error("Failed to load trending events", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrending();
  }, []);

  return (
    <div className="min-h-screen pt-35 pb-12 px-6 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mb-20 space-y-6">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 text-gradient pb-2">
          Experience Campus Life
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl">
          Discover hackathons, cultural fests, workshops, and more. Your digital pass to everything happening on campus.
        </p>
        <Link 
          to="/events" 
          className="mt-8 px-8 py-4 bg-brand-primary hover:bg-brand-hover text-white rounded-full font-semibold transition-all duration-300 shadow-[0_0_15px_rgba(107,50,241,0.5)]"
        >
          Explore All Events
        </Link>
      </div>

      {/* Quick Featured Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8 border-l-4 border-brand-accent pl-3">Trending This Week</h2>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
             <p>Loading ...</p>
          </div>
        ) : trendingEvents.length === 0 ? (
          <p className="text-text-muted">No upcoming events right now. Check back later!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingEvents.map((event) => (
              <Link to={`/events/${event._id}`} key={event._id} className="glass-panel-interactive p-5 flex flex-col h-full text-left">
                <div className="w-full h-48 bg-gray-800 rounded-lg mb-4 overflow-hidden relative">
                  {event.coverImageUrl ? (
                    <img src={event.coverImageUrl} alt={event.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}
                </div>
                <span className="text-brand-accent text-sm font-semibold mb-2 uppercase tracking-wider">{event.category}</span>
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <p className="text-gray-400 text-sm mb-4 flex-grow line-clamp-2">{event.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-300 border-t border-gray-700/50 pt-4 mt-auto">
                  <span>{new Date(event.dateTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  <span className="truncate ml-2 text-right">{event.location}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Loader2, Search } from 'lucide-react';

const EventCatalog = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Search aur Category ke liye naye states
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

  // 2. Fetch function jo parameters accept karta hai
  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      // Backend ko query parameters bhejna
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/events`, {
        params: {
          search: searchTerm, // Yeh backend ke req.query.search me jayega
          category: category  // Yeh backend ke req.query.category me jayega
        }
      });
      setEvents(res.data.data);
    } catch (error) {
      console.error("Failed to load events", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Page load par aur jab bhi category change ho, tab data fetch karo
  useEffect(() => {
    fetchEvents();
  }, [category]); // Category change hote hi auto-fetch hoga

  // 4. Search button click karne par fetch karo
  const handleSearch = () => {
    fetchEvents();
  };

  // 5. Agar user 'Enter' dabaye toh bhi search ho
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchEvents();
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 max-w-7xl mx-auto">
      
      {/* Page Header & Search */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-6 text-gradient inline-block">Event Catalog</h1>
        
        <div className="glass-panel-Rounded p-4 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search size={20} className="absolute left-3 top-3.5 text-gray-500" />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Search events (e.g., Hackathon, Tournament)..." 
              className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors"
            />
          </div>
          
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-accent min-w-[180px]"
          >
            <option value="all">All Categories</option>
            <option value="tech">Technology</option>
            <option value="cultural">Cultural</option>
            <option value="sports">Sports</option>
            <option value="workshop">Workshop</option> {/* Added Workshop */}
          </select>

          <button 
            onClick={handleSearch}
            className="bg-brand-primary hover:bg-brand-hover text-white px-8 py-3 rounded-lg font-bold transition-all shadow-glow-primary flex items-center justify-center min-w-[120px]"
          >
            Search
          </button>
        </div>
      </div>

      {/* Events Grid */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 text-brand-accent">
          <Loader2 className="animate-spin mb-4" size={48} />
          <p>Finding events...</p>
        </div>
      ) : events.length === 0 ? (
        <div className="glass-panel-Rounded p-12 text-center text-gray-400">
          <Search size={48} className="mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-bold text-white mb-2">No events found</h3>
          <p>Try adjusting your search terms or changing the category filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <Link to={`/events/${event._id}`} key={event._id} className="glass-panel-interactive p-4 flex flex-col h-full group">
              <div className="w-full h-40 bg-gray-800 rounded-lg mb-4 overflow-hidden relative">
                {event.coverImageUrl ? (
                  <img src={event.coverImageUrl} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
               {/* Visual indicator for Open/Closed status */}
<div className={`absolute top-2 right-2 text-white text-[10px] font-bold px-2 py-1 rounded uppercase backdrop-blur-sm shadow-md ${
  event.availableSeats === 0 ? 'bg-red-500/90' : 'bg-green-500/90'
}`}>
  {event.availableSeats === 0 ? 'Closed' : 'Open'}
</div>
              </div>
              <span className="text-brand-accent text-xs font-bold mb-1 uppercase tracking-wider">{event.category}</span>
              <h3 className="text-lg font-bold mb-2 line-clamp-2">{event.title}</h3>
              <div className="text-xs text-gray-400 mt-auto space-y-2 pt-3 border-t border-gray-700/50">
                <p className="flex items-center gap-2">
                  📅 {new Date(event.dateTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
                <p className="truncate flex items-center gap-2">
                  📍 {event.location}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventCatalog;
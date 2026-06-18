import { Link } from 'react-router-dom';

const EventCatalog = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-6 max-w-7xl mx-auto">
      
      {/* Page Header & Search */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-6 text-gradient inline-block">Event Catalog</h1>
        
        <div className="glass-panel-Rounded p-4 flex flex-col md:flex-row gap-4">
          <input 
            type="text" 
            placeholder="Search events (e.g., UI/UX Workshop)..." 
            className="flex-grow bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors"
          />
          <select className="bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-accent">
            <option value="all">All Categories</option>
            <option value="tech">Technology</option>
            <option value="cultural">Cultural</option>
            <option value="sports">Sports</option>
          </select>
          <button className="bg-brand-primary hover:bg-brand-hover text-white px-8 py-3 rounded-lg font-medium transition-colors">
            Search
          </button>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <Link to={`/events/${item}`} key={item} className="glass-panel-interactive p-4 flex flex-col h-full">
            <div className="w-full h-40 bg-gray-800 rounded-lg mb-4"></div>
            <span className="text-brand-accent text-xs font-semibold mb-1 uppercase tracking-wider">Workshop</span>
            <h3 className="text-lg font-bold mb-2 line-clamp-1">Tech Startup Pitch</h3>
            <div className="text-xs text-gray-400 mt-auto space-y-1">
              <p>📅 Nov {10 + item}, 2026</p>
              <p>📍 Seminar Hall B</p>
            </div>
          </Link>
        ))}
      </div>
      
    </div>
  );
};

export default EventCatalog;
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen pt-20 pb-12 px-6 max-w-7xl mx-auto">
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Mock Event Card - We use your glass-panel-interactive here */}
          {[1, 2, 3].map((item) => (
            <Link to={`/events/${item}`} key={item} className="glass-panel-interactive p-5 flex flex-col h-full text-left">
              <div className="w-full h-48 bg-gray-800 rounded-lg mb-4 overflow-hidden">
                {/* Replace with actual image tag later */}
                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-gray-500">
                  Event Image
                </div>
              </div>
              <span className="text-brand-accent text-sm font-semibold mb-2">Hackathon</span>
              <h3 className="text-xl font-bold mb-2">CodeRed 2026</h3>
              <p className="text-gray-400 text-sm mb-4 flex-grow">A 24-hour coding marathon to build the future of Web3 and AI.</p>
              <div className="flex justify-between items-center text-sm text-gray-300 border-t border-gray-700/50 pt-4 mt-auto">
                <span>Oct 15, 2026</span>
                <span>Main Auditorium</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
import GlassButton from '../../components/ui/GlassButton';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center ">
      
      <h1 className="text-5xl md:text-6xl font-bold mb-6 text-transparent  bg-clip-text bg-linear-270 from-blue-400 to-purple-500">
        Never Miss a College Event
      </h1>
      <p className="text-gray-300 mb-8 max-w-lg text-lg">
        Register for hackathons, workshops, and fests in one click. Join your team and start building.
      </p>
      <GlassButton>
        Explore Events
      </GlassButton>
    </div>
  );
}
export default function RegisterButton({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      // Using our custom brand colors and adding a slick hover lift
      className={`bg-brand-primary border border-white/10 text-white px-6 py-2 rounded-xl font-semibold hover:bg-brand-hover hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(139,92,246,0.6)] ${className}`}
    >
      {children}
    </button>
  );
}
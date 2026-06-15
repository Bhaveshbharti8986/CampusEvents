export default function Button({ children, onClick, type = "button", variant = "primary" }) {
  const base = "w-full py-2 rounded font-medium transition-colors";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
    success: "bg-green-600 text-white hover:bg-green-700",
  };

  return (
    <button type={type} onClick={onClick} className={`${base} ${variants[variant]}`}>
      {children}
    </button>
  );
}

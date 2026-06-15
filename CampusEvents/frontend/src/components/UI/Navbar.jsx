export default function Navbar({ appName = "Campus Event Manager", onLogout }) {
  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow-md">
      <h1 className="text-lg font-bold">{appName}</h1>
      <button
        onClick={onLogout}
        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-sm"
      >
        Logout
      </button>
    </nav>
  );
}

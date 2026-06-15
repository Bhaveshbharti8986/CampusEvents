import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("No token found, please login");
        navigate("/auth/login");
        return;
      }
      try {
        const res = await axios.get("http://localhost:3301/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch (err) {
        toast.error(err.response?.data?.message || "Session expired, please login again");
        localStorage.removeItem("accessToken");
        navigate("/auth/login");
      }
    };
    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3301/api/auth/logout", {}, { withCredentials: true });
      localStorage.removeItem("accessToken");
      toast.success("Logged out successfully");
      navigate("/auth/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow-md">
        <h1 className="text-lg font-bold">🎓 Campus Event Manager</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-sm"
        >
          Logout
        </button>
      </nav>

      {/* Landing Page Content */}
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-2xl font-bold mb-4">Welcome to the Event Management Dashboard</h2>
        {user && (
          <p className="mb-6 text-gray-700">
            Logged in as <span className="font-semibold">{user.username}</span> ({user.email})
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-3/4">
          <div className="bg-white shadow-md rounded p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">📅 Register for Events</h3>
            <p className="text-gray-600 mb-4">Browse and register for upcoming college events.</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded">View Events</button>
          </div>

          <div className="bg-white shadow-md rounded p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">🛠 Admin Dashboard</h3>
            <p className="text-gray-600 mb-4">Manage events, registrations, and certificates.</p>
            <button className="bg-green-600 text-white px-4 py-2 rounded">Go to Admin</button>
          </div>

          <div className="bg-white shadow-md rounded p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">🎓 Certificates</h3>
            <p className="text-gray-600 mb-4">Download participation and achievement certificates.</p>
            <button className="bg-purple-600 text-white px-4 py-2 rounded">View Certificates</button>
          </div>

          <div className="bg-white shadow-md rounded p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">🔔 Notifications</h3>
            <p className="text-gray-600 mb-4">Stay updated with event announcements.</p>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded">View Notifications</button>
          </div>
        </div>
      </div>
    </div>
  );
}

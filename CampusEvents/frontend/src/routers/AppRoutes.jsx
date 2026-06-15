import { Routes, Route } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/auth.page/login";
import ProtectedRoute from "./ProtectedRoute";
export default function AppRoutes() {
  return (
    <Routes>
   
      <Route path="/*" element={<AuthRoutes className="border-r-red-50" />} />

      {/* Protected dashboard */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />

     
      {/* Default redirect */}
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

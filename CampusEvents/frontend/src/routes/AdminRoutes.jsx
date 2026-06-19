import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from '../pages/admin/AdminDashboard';
import CreateEvent from '../pages/admin/CreateEvents';
import ManageEvents from '../pages/admin/ManageEvents';
import ManageTeams from '../pages/admin/ManageTeam';
import ProtectedRoute from './ProtectedRoutes';

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<AdminDashboard/>} />
      <Route path="/events" element={<ManageEvents/>} />
      <Route path="/create-event" element={<CreateEvent/>} />
      <Route path="/manage-teams" element={<ManageTeams/>} />
    </Routes>
  );
}

export default AdminRoutes;
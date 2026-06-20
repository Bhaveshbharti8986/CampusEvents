import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from '../pages/admin/AdminDashboard';
import CreateEvent from '../pages/admin/CreateEvents';
import ManageEvents from '../pages/admin/ManageEvents';

import ProtectedRoute from './ProtectedRoutes';
import EditEvent from '../pages/admin/EditEvents';
import SendNotification from '../pages/admin/SendNotification';
function AdminRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<AdminDashboard/>} />
      <Route path="/events" element={<ManageEvents/>} />
      <Route path="/create-event" element={<CreateEvent/>} />
       <Route path="/edit-event/:id" element={<EditEvent />} />
      <Route path="/send-notification" element={<SendNotification/>} />
     
    </Routes>
  );
}

export default AdminRoutes;
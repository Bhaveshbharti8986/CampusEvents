import React from 'react'
import { Routes , Route } from 'react-router-dom'
import Certificates from '../pages/student/Certificates'
import MyTickets from '../pages/student/MyTickets'
import Profile from '../pages/student/Profile'
import StudentDashboard from '../pages/student/StudentDashboard'
import ProtectedRoute from './ProtectedRoutes'

function StudentRoutes() {
  return (
    <Routes>
      <Route path="/certificates" element={<Certificates/>} />
      <Route path="/my-tickets" element={<MyTickets/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/dashboard" element={<ProtectedRoute redirectPath="/auth/login"><StudentDashboard/></ProtectedRoute>} />
    </Routes>
  )
}

export default StudentRoutes
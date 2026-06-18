import { Routes, Route } from 'react-router-dom';
import Home from '../pages/public/Home.jsx';

import AuthRoutes from './AuthRoutes.jsx';
import AuthLayout from '../components/layout/AuthLayout.jsx';
import ProtectedRoute from './ProtectedRoutes.jsx';
import StudentRoutes from './StudentRoutes.jsx';
import Sidebar from '../components/layout/Sidebar.jsx';
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="*" element={<Home/>} />
      
      <Route path="/auth/*" element={<AuthLayout><AuthRoutes/></AuthLayout>} />

      <Route path="/student/*" element={<StudentRoutes/>} />
    </Routes>
  );
}
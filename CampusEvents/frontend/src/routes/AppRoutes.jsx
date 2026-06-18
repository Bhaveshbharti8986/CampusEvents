import { Routes, Route } from 'react-router-dom';
import Home from '../pages/public/Home.jsx';

import AuthRoutes from './AuthRoutes.jsx';
import AuthLayout from '../components/layout/AuthLayout.jsx';
import ProtectedRoute from './ProtectedRoutes.jsx';
import StudentRoutes from './StudentRoutes.jsx';
import Sidebar from '../components/layout/Sidebar.jsx';
import EventDetails from '../pages/public/EventDetails.jsx';
import Eventcatalog from '../pages/public/EventCatalog.jsx';
export default function AppRoutes() {
  return (
    <Routes>
      
      <Route path="/" element={<Home />} /> 
       <Route path="/events" element={<Eventcatalog />} />    
       <Route path="/events/:eventId" element={<EventDetails />} />   

      
      <Route path="/auth/*" element={<AuthLayout><AuthRoutes/></AuthLayout>} />

      <Route path="/student/*" element={<StudentRoutes/>} />
    </Routes>
  );
}
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/public/Home.jsx';

import AuthRoutes from './AuthRoutes.jsx';
import AuthLayout from '../components/layout/AuthLayout.jsx';
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
     
      <Route path="/auth/*" element={<AuthLayout><AuthRoutes/></AuthLayout>} />
    </Routes>
  );
}
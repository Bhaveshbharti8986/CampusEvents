import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

export default function App() {
  return (
    <BrowserRouter>
      {/* Dark background with a subtle gradient so the glassmorphism pops */}
      <div className="min-h-screen bg-slate-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] text-white font-sans overflow-x-hidden">
       <Navbar />
        <main className="container mx-auto ">
          <AppRoutes />
        </main>
        
        <Footer/>
      </div>
    </BrowserRouter>
  );
}
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Pedidos from './pages/Pedidos';
import Inventario from './pages/Inventario';
import { appConfig } from './config/appConfig';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background relative selection:bg-primary/30">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/panel" element={<Dashboard />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/inventario" element={<Inventario />} />
          <Route path="*" element={<Home />} />
        </Routes>

        {/* Footer */}
        <footer className="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-6 max-w-7xl mx-auto border-t border-sky-300/5 bg-slate-950/80 backdrop-blur-md">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="text-lg font-semibold text-sky-300">AuraCore Systems</div>
            <p className="text-sm text-slate-400">{appConfig.footer.copyright}</p>
          </div>
          <div className="flex gap-8">
            {appConfig.footer.links.map(link => (
              <a key={link} href="#" className="text-slate-500 hover:text-sky-300 transition-colors text-sm">
                {link}
              </a>
            ))}
          </div>
        </footer>

        {/* Extra Ambient Lighting */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-tertiary/5 rounded-full blur-[150px]" />
        </div>
      </div>
    </Router>
  );
}


import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { appConfig } from '../config/appConfig';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

interface User {
  email: string;
  name: string;
  picture: string;
}

export default function Navbar() {
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('auracore_user');
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  const handleLogin = () => {
    if (email.includes('@gmail.com') || email.includes('@googlemail.com')) {
      const newUser: User = {
        email: email,
        name: email.split('@')[0],
        picture: `https://ui-avatars.com/api/?name=${encodeURIComponent(email.split('@')[0])}&background=7dd3fc&color=fff`
      };
      setUser(newUser);
      localStorage.setItem('auracore_user', JSON.stringify(newUser));
      setShowLogin(false);
      setEmail('');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('auracore_user');
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-3 bg-slate-900/60 backdrop-blur-lg rounded-full mt-4 mx-auto w-[92%] max-w-7xl border border-sky-300/10 shadow-[0_0_30px_rgba(125,211,252,0.05)]">
        <div className="text-xl font-bold text-sky-300 tracking-tighter">
          AuraCore Systems
        </div>
        
        <div className="hidden md:flex gap-8 items-center">
          {appConfig.navigation.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "transition-all duration-300 hover:text-sky-200 text-sm font-medium",
                  isActive 
                    ? "text-sky-300 border-b-2 border-sky-300 pb-1" 
                    : "text-slate-400"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
        
        {user ? (
          <div className="flex items-center gap-3">
            <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full" />
            <button
              onClick={handleLogout}
              className="text-slate-400 hover:text-sky-300 text-sm"
            >
              Salir
            </button>
          </div>
        ) : (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowLogin(true)}
            className="bg-primary/10 border border-primary/20 text-sky-300 px-6 py-2 rounded-full font-medium hover:bg-primary/20 transition-all"
          >
            Acceso
          </motion.button>
        )}
      </nav>

      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-900 border border-sky-300/20 rounded-2xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold text-sky-300 mb-4">Iniciar sesión con Gmail</h2>
            <p className="text-slate-400 mb-6">Ingresa tu correo Gmail para acceder a tus cotizaciones</p>
            <input
              type="email"
              placeholder="tuemail@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800 border border-sky-300/10 rounded-xl text-white placeholder-slate-500 focus:border-primary focus:outline-none mb-4"
            />
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogin}
                className="flex-1 py-3 bg-primary text-slate-900 font-bold rounded-xl"
              >
                Iniciar sesión
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowLogin(false)}
                className="px-6 py-3 bg-slate-800 text-slate-400 font-medium rounded-xl"
              >
                Cancelar
              </motion.button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

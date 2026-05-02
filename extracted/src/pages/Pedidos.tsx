import { useState, useEffect, FormEvent } from 'react';
import { motion } from 'motion/react';
import GlassCard from '../components/GlassCard';
import { cn } from '../lib/utils';

interface Order {
  client_id: string;
  service_type: string;
  business_specs: string;
  order_status: 'pendiente' | 'en_proceso' | 'desplegado';
  config_prefs: string;
  contact_ref: string;
  created_at: string;
}

function generateClientId(): string {
  return 'CLI-' + Math.random().toString(36).substring(2, 10).toUpperCase();
}

export default function Pedidos() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [user, setUser] = useState<{email: string; name: string; picture: string} | null>(null);
  const [formData, setFormData] = useState({
    service_type: '',
    business_specs: '',
    config_prefs: '',
    contact_ref: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const savedOrders = localStorage.getItem('auracore_orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
    const savedUser = localStorage.getItem('auracore_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const saveOrder = (order: Order) => {
    const newOrders = [...orders, order];
    setOrders(newOrders);
    localStorage.setItem('auracore_orders', JSON.stringify(newOrders));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const order: Order = {
      client_id: generateClientId(),
      service_type: formData.service_type,
      business_specs: formData.business_specs,
      order_status: 'pendiente',
      config_prefs: formData.config_prefs,
      contact_ref: formData.contact_ref,
      created_at: new Date().toISOString()
    };
    saveOrder(order);
    setSubmitted(true);
    setShowForm(false);
    setFormData({ service_type: '', business_specs: '', config_prefs: '', contact_ref: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pendiente': return 'text-yellow-400';
      case 'en_proceso': return 'text-blue-400';
      case 'desplegado': return 'text-green-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <main className="relative pt-32 overflow-hidden pb-32 min-h-screen">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      
      {!user ? (
        <div className="max-w-4xl mx-auto px-8">
          <GlassCard className="text-center py-16">
            <h2 className="text-2xl font-bold text-on-surface mb-4">Acceso Restringido</h2>
            <p className="text-on-surface-variant mb-6">Debes iniciar sesión con tu cuenta Gmail para acceder a las cotizaciones</p>
            <a href="/" className="inline-block px-6 py-3 bg-primary text-slate-900 font-bold rounded-xl">
              Ir a Iniciar Sesión
            </a>
          </GlassCard>
        </div>
      ) : (
      <div className="max-w-4xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-on-surface mb-4">
            Cotización de Microservicios
          </h1>
          <p className="text-on-surface-variant text-lg">
            Solicita una cotización personalizada para tu microempresa
          </p>
        </motion.div>

        {submitted && (
          <GlassCard className="mb-8 bg-green-500/10 border-green-500/30">
            <p className="text-green-400 text-center font-semibold">
              ✓ Pedido guardado correctamente en localStorage
            </p>
          </GlassCard>
        )}

        {!showForm ? (
          <>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowForm(true)}
              className="w-full py-4 bg-primary text-on-primary font-bold rounded-xl shadow-lg shadow-primary/20 mb-8"
            >
              + Nueva Cotización
            </motion.button>

            {orders.length === 0 ? (
              <GlassCard>
                <p className="text-on-surface-variant text-center py-8">
                  No hay pedidos aún. Crea tu primer pedido.
                </p>
              </GlassCard>
            ) : (
              <div className="space-y-4">
                {orders.map((order, idx) => (
                  <GlassCard key={idx} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <div className="font-mono text-sm text-primary mb-1">{order.client_id}</div>
                      <div className="font-semibold text-on-surface">{order.service_type}</div>
                      <div className="text-sm text-on-surface-variant">{order.business_specs}</div>
                      <div className="text-xs text-slate-500 mt-1">Contacto: {order.contact_ref}</div>
                    </div>
                    <div className={cn("px-3 py-1 rounded-full text-sm font-medium", getStatusColor(order.order_status))}>
                      {order.order_status.replace('_', ' ')}
                    </div>
                  </GlassCard>
                ))}
              </div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <GlassCard>
              <h2 className="text-2xl font-bold mb-6 text-on-surface">Nueva Cotización</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-on-surface-variant mb-2">
                    Tipo de Servicio *
                  </label>
                  <select
                    required
                    value={formData.service_type}
                    onChange={e => setFormData({...formData, service_type: e.target.value})}
                    className="w-full px-4 py-3 bg-surface/50 border border-sky-300/10 rounded-xl text-on-surface focus:border-primary focus:outline-none"
                  >
                    <option value="">Selecciona un servicio...</option>
                    <option value="Cloud Business Hub">Cloud Business Hub</option>
                    <option value="Instant Web Presence">Instant Web Presence</option>
                    <option value="AI Agent Integration">AI Agent Integration</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-on-surface-variant mb-2">
                    Nombre del Negocio y Sector *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Ej: Repostería María, Consultoría Legal..."
                    value={formData.business_specs}
                    onChange={e => setFormData({...formData, business_specs: e.target.value})}
                    className="w-full px-4 py-3 bg-surface/50 border border-sky-300/10 rounded-xl text-on-surface focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-on-surface-variant mb-2">
                    Preferencias de Diseño
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Color neón verde, modo oscuro..."
                    value={formData.config_prefs}
                    onChange={e => setFormData({...formData, config_prefs: e.target.value})}
                    className="w-full px-4 py-3 bg-surface/50 border border-sky-300/10 rounded-xl text-on-surface focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-on-surface-variant mb-2">
                    Email o WhatsApp *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="contacto@negocio.com o +34..."
                    value={formData.contact_ref}
                    onChange={e => setFormData({...formData, contact_ref: e.target.value})}
                    className="w-full px-4 py-3 bg-surface/50 border border-sky-300/10 rounded-xl text-on-surface focus:border-primary focus:outline-none"
                  />
                </div>

                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="flex-1 py-3 bg-primary text-on-primary font-bold rounded-xl shadow-lg shadow-primary/20"
                  >
                    Solicitar Cotización
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-3 bg-surface/50 border border-sky-300/10 text-on-surface font-semibold rounded-xl"
                  >
                    Cancelar
                  </motion.button>
                </div>
              </form>
            </GlassCard>
          </motion.div>
        )}
      </div>
      )}
    </main>
  );
}
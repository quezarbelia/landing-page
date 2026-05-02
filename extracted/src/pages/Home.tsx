import { motion } from 'motion/react';
import { appConfig } from '../config/appConfig';
import GlassCard from '../components/GlassCard';
import { cn } from '../lib/utils';

export default function Home() {
  const { hero, services, security } = appConfig.home;

  return (
    <main className="relative pt-32 overflow-hidden pb-32">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-5%] w-[30%] h-[30%] bg-tertiary/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-16 items-center min-h-[700px]">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            {hero.badge}
          </div>
          
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tighter leading-tight mb-6 bg-gradient-to-r from-on-surface via-primary to-on-surface-variant bg-clip-text text-transparent">
            {hero.title}
          </h1>
          
          <p className="text-xl text-on-surface-variant max-w-xl mb-10 leading-relaxed font-light">
            {hero.description}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-primary text-on-primary font-bold rounded-xl shadow-lg shadow-primary/20"
            >
              {hero.primaryBtn}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-surface/50 border border-sky-300/10 text-on-surface font-semibold rounded-xl hover:bg-surface-bright"
            >
              {hero.secondaryBtn}
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative aspect-square flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-[80px]" />
          <GlassCard className="w-full h-full p-8 flex items-center justify-center relative">
            <img 
              src={hero.image} 
              alt="Visualización de Nodos" 
              className="w-full h-full object-cover rounded-2xl opacity-80 mix-blend-lighten" 
            />
            
            {/* Floating Data Points */}
            <div className="absolute top-12 left-12 glass-elevated px-4 py-2 rounded-lg text-xs font-mono text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">terminal</span>
              <span>LATENCY_MS: 0.002</span>
            </div>
            <div className="absolute bottom-16 right-12 glass-elevated px-4 py-2 rounded-lg text-xs font-mono text-tertiary flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">memory</span>
              <span>CORE_LOAD: 12%</span>
            </div>
          </GlassCard>
        </motion.div>
      </section>

      {/* Services Bento Grid */}
      <section className="max-w-7xl mx-auto px-8 py-32">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-on-surface mb-4">{services.title}</h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto">{services.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {services.cards.map((card, idx) => (
            <GlassCard 
              key={idx} 
              className={cn(
                "group hover:border-primary/40 transition-colors",
                card.id === 'arch' ? "md:col-span-2" : "md:col-span-1"
              )}
            >
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-colors",
                idx % 2 === 0 ? "bg-primary/10 group-hover:bg-primary/20" : "bg-tertiary/10 group-hover:bg-tertiary/20"
              )}>
                <span className={cn(
                  "material-symbols-outlined text-3xl",
                  idx % 2 === 0 ? "text-primary" : "text-tertiary"
                )}>
                  {card.icon}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-3">{card.title}</h3>
              <p className="text-on-surface-variant font-light mb-6">{card.description}</p>
              
              {card.image && (
                <div className="h-40 bg-surface/30 rounded-2xl overflow-hidden">
                  <img 
                    src={card.image} 
                    alt={card.title}
                    className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" 
                  />
                </div>
              )}
            </GlassCard>
          ))}

          {/* Full Width Security Card */}
          <GlassCard className="md:col-span-4 flex flex-col md:flex-row items-center gap-8 group hover:border-primary/40 transition-colors">
            <div className="flex-1">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary text-3xl">verified_user</span>
              </div>
              <h3 className="text-3xl font-bold mb-3">{security.title}</h3>
              <p className="text-on-surface-variant font-light text-lg">{security.description}</p>
            </div>
            <div className="w-full md:w-1/3 aspect-video bg-surface/50 rounded-2xl border border-sky-300/10 overflow-hidden">
              <img src={security.image} alt="Seguridad" className="w-full h-full object-cover" />
            </div>
          </GlassCard>
        </div>
      </section>
    </main>
  );
}

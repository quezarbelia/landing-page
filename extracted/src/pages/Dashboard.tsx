import { motion } from 'motion/react';
import { appConfig } from '../config/appConfig';
import GlassCard from '../components/GlassCard';
import { cn } from '../lib/utils';

export default function Dashboard() {
  const { title, description, metrics, services } = appConfig.dashboard;

  return (
    <main className="pt-28 pb-12 px-6 md:px-12 max-w-7xl mx-auto">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-on-surface tracking-tight mb-2">{title}</h1>
        <p className="text-on-surface-variant max-w-2xl">{description}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Metrics */}
        <div className="md:col-span-12 grid grid-cols-1 sm:grid-cols-3 gap-4 font-inter">
          {metrics.map((metric, idx) => (
            <GlassCard key={idx} className="p-6 flex items-center gap-4">
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center",
                metric.color === 'primary' ? "bg-primary/10 text-primary" : 
                metric.color === 'tertiary' ? "bg-tertiary/10 text-tertiary" : "bg-secondary/10 text-secondary"
              )}>
                <span className="material-symbols-outlined">{metric.icon}</span>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-on-surface-variant font-semibold">{metric.label}</p>
                <p className={cn(
                  "text-2xl font-bold",
                  metric.color === 'primary' ? "text-primary" : 
                  metric.color === 'tertiary' ? "text-tertiary" : "text-secondary"
                )}>{metric.value}</p>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Services Status */}
        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {services.map((service, idx) => (
            <GlassCard 
              key={idx} 
              elevated 
              className="p-6 group hover:border-primary/40 transition-all cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="material-symbols-outlined text-primary text-3xl">memory</span>
                <span className={cn(
                  "px-2 py-1 text-[10px] font-bold rounded border",
                  service.isError 
                    ? "bg-red-500/10 text-red-400 border-red-500/20" 
                    : "bg-green-500/10 text-green-400 border-green-500/20"
                )}>
                  {service.status}
                </span>
              </div>
              <h3 className="text-lg font-bold mb-1">{service.name}</h3>
              <p className="text-sm text-on-surface-variant mb-4">{service.description}</p>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${service.progress}%` }}
                  transition={{ duration: 1, delay: idx * 0.1 }}
                  className={cn(
                    "h-full",
                    service.isError ? "bg-tertiary" : "bg-primary"
                  )} 
                />
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Terminal Section */}
        <div className="md:col-span-4 flex flex-col">
          <GlassCard className="flex flex-col h-full border-primary/5 p-0">
            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-slate-900/40">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-error animate-pulse"></div>
                <span className="text-xs font-mono uppercase text-on-surface-variant">Live Terminal Stream</span>
              </div>
              <span className="material-symbols-outlined text-sm text-on-surface-variant cursor-pointer hover:text-primary">settings</span>
            </div>
            <div className="p-4 font-mono text-[11px] leading-relaxed overflow-y-auto h-[320px] terminal-scroll">
              <div className="space-y-1.5">
                <p className="text-primary/70"><span className="text-white/30">[14:22:01]</span> AUTH_CORE: Validating JWT handshake...</p>
                <p className="text-green-400/70"><span className="text-white/30">[14:22:02]</span> AUTH_CORE: Handshake success. User ID: 0x82...F1</p>
                <p className="text-on-surface-variant"><span className="text-white/30">[14:22:05]</span> REDIS_SYNC: Replication factor verified (3/3).</p>
                <p className="text-tertiary/70"><span className="text-white/30">[14:22:08]</span> KAFKA_BUS: Received message from ANALYTICS_V2.</p>
                <p className="text-error/70"><span className="text-white/30">[14:22:12]</span> DB_CLUSTER: Retrying connection to shard-B... SUCCESS</p>
                <p className="text-on-surface-variant"><span className="text-white/30">[14:22:15]</span> SYSTEM: Garbage collection finished (12.4ms).</p>
                <p className="text-primary/70"><span className="text-white/30">[14:22:18]</span> VAULT: Rotating session tokens for Cluster-7.</p>
                <p className="text-on-surface-variant animate-pulse"><span className="text-white/30">[14:22:20]</span> Listening for kernel events_</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </main>
  );
}


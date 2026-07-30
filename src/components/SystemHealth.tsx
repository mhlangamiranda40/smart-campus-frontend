import { useEffect, useState } from 'react';
import { getSystemHealth } from '../api/apiService';
import type { SystemHealth as HealthType } from '../types';

const signalQuality = (dBm: number) => {
  if (dBm >= -50) return { label: 'Excellent', color: 'bg-emerald-500', width: '100%' };
  if (dBm >= -60) return { label: 'Good', color: 'bg-emerald-400', width: '75%' };
  if (dBm >= -70) return { label: 'Fair', color: 'bg-amber-400', width: '50%' };
  return { label: 'Weak', color: 'bg-rose-400', width: '25%' };
};

const SystemHealth = () => {
  const [health, setHealth] = useState<HealthType | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const data = await getSystemHealth();
        setHealth(data);
        setError(false);
      } catch {
        setError(true);
      }
    };
    fetchHealth();
    const interval = setInterval(fetchHealth, 10000);
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <section className="panel p-5">
        <div className="rounded-xl bg-rose-50 p-4 text-center text-sm font-medium text-rose-700">
          Health check failed
        </div>
      </section>
    );
  }

  if (!health) {
    return (
      <section className="panel animate-pulse p-5">
        <div className="h-5 w-32 rounded bg-slate-200" />
        <div className="mt-4 space-y-3">
          <div className="h-12 rounded-xl bg-slate-100" />
          <div className="h-12 rounded-xl bg-slate-100" />
          <div className="h-12 rounded-xl bg-slate-100" />
        </div>
      </section>
    );
  }

  const signal = signalQuality(health.signalStrength);

  return (
    <section className="panel overflow-hidden">
      <div className="panel-header">
        <div>
          <h2 className="text-lg font-bold text-slate-800">System Health</h2>
          <p className="text-sm text-slate-500">ESP32 sensor network</p>
        </div>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
            health.esp32Online ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
          }`}
        >
          <span className={`h-2 w-2 rounded-full ${health.esp32Online ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
          {health.esp32Online ? 'Online' : 'Offline'}
        </span>
      </div>

      <div className="space-y-3 p-5">
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Gateway</p>
          <p className="mt-1 text-sm font-bold text-slate-800">ESP32 Controller</p>
          <p className="text-xs text-slate-500">
            {health.esp32Online ? 'Connected and reporting' : 'Not responding'}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Last heartbeat</p>
          <p className="mt-1 text-sm font-bold text-slate-800">
            {new Date(health.lastHeartbeat).toLocaleTimeString()}
          </p>
          <p className="text-xs text-slate-500">{new Date(health.lastHeartbeat).toLocaleDateString()}</p>
        </div>

        <div className="rounded-xl bg-slate-50 p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Wi-Fi signal</p>
            <span className="text-xs font-semibold text-slate-600">{signal.label}</span>
          </div>
          <p className="mt-1 text-sm font-bold text-slate-800">{health.signalStrength} dBm</p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
            <div className={`h-full rounded-full transition-all duration-500 ${signal.color}`} style={{ width: signal.width }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SystemHealth;

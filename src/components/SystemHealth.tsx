import { useEffect, useState } from 'react';
import { getSystemHealth } from '../api/apiService';
import type { SystemHealth as HealthType } from '../types';

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

  if (error) return <div className="p-4 bg-red-100 text-red-700 rounded">Health check failed</div>;
  if (!health) return <div className="p-4 text-gray-500">Loading system health...</div>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold text-lg mb-2">System Health</h3>
      <ul className="space-y-1 text-sm">
        <li>ESP32: {health.esp32Online ? '🟢 Online' : '🔴 Offline'}</li>
        <li>Last heartbeat: {new Date(health.lastHeartbeat).toLocaleTimeString()}</li>
        <li>Signal: {health.signalStrength} dBm</li>
      </ul>
    </div>
  );
};

export default SystemHealth;

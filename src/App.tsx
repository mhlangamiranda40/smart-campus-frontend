import { useEffect, useState } from 'react';
import { getRoomsStatus } from './api/apiService';
import type { RoomStatus } from './types';import RoomGrid from './components/RoomGrid';
import SystemHealth from './components/SystemHealth';
import OccupancyChart from './components/OccupancyChart';

function App() {
  const [rooms, setRooms] = useState<RoomStatus[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [lastRefreshed, setLastRefreshed] = useState<string>(new Date().toISOString());

  const fetchData = async () => {
    try {
      const data = await getRoomsStatus();
      setRooms(data);
      setLastRefreshed(new Date().toISOString());
      setError(null);
    } catch (err) {
      setError('Failed to fetch room status. Please try again.');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <header className="max-w-7xl mx-auto flex flex-wrap items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-blue-800">Smart Campus – Belgium Campus</h1>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-gray-600">Last updated: {new Date(lastRefreshed).toLocaleTimeString()}</span>
          <button
            onClick={fetchData}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Refresh
          </button>
        </div>
      </header>

      {error && (
        <div className="max-w-7xl mx-auto mb-4 p-4 bg-red-100 text-red-700 border border-red-300 rounded">
          ⚠️ {error}
        </div>
      )}

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <RoomGrid rooms={rooms} />
        </div>
        <div className="lg:col-span-1">
          <SystemHealth />
        </div>
      </main>

      <section className="max-w-7xl mx-auto mt-8">
        <OccupancyChart roomId="LT1" />
      </section>
    </div>
  );
}

export default App;

import { useEffect, useMemo, useState } from 'react';
import { getRoomsStatus } from './api/apiService';
import type { RoomStatus } from './types';
import RoomGrid from './components/RoomGrid';
import SystemHealth from './components/SystemHealth';
import OccupancyChart from './components/OccupancyChart';
import { STATUS_CONFIG } from './constants/roomStatus';

type StatusFilter = RoomStatus['status'] | 'all';

const FILTER_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'All Rooms' },
  { value: 'occupied', label: 'Occupied' },
  { value: 'empty', label: 'Available' },
  { value: 'offline', label: 'Offline' },
];

function App() {
  const [rooms, setRooms] = useState<RoomStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefreshed, setLastRefreshed] = useState<string>(new Date().toISOString());
  const [filter, setFilter] = useState<StatusFilter>('all');
  const [selectedRoom, setSelectedRoom] = useState('LT1');

  const fetchData = async () => {
    try {
      const data = await getRoomsStatus();
      setRooms(data);
      setLastRefreshed(new Date().toISOString());
      setError(null);
      if (!data.find((r) => r.roomId === selectedRoom) && data.length > 0) {
        setSelectedRoom(data[0].roomId);
      }
    } catch (err) {
      setError('Failed to fetch room status. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const stats = useMemo(
    () => ({
      total: rooms.length,
      occupied: rooms.filter((r) => r.status === 'occupied').length,
      empty: rooms.filter((r) => r.status === 'empty').length,
      offline: rooms.filter((r) => r.status === 'offline').length,
    }),
    [rooms],
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eef4ff] via-[#f8fafc] to-[#f1f5f9]">
      <header className="bg-gradient-to-br from-[#152352] via-[#243a96] to-[#3b5bdb] text-white shadow-lg">
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">Belgium Campus</p>
              <h1 className="mt-1 text-2xl font-bold md:text-3xl">Smart Campus Dashboard</h1>
              <p className="mt-1 max-w-xl text-sm text-blue-100">
                Real-time room occupancy monitoring powered by ESP32 motion sensors
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-white/10 px-4 py-2 text-sm backdrop-blur-sm">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-200">Last updated</p>
                <p className="font-semibold">{new Date(lastRefreshed).toLocaleTimeString()}</p>
              </div>
              <button
                onClick={fetchData}
                className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-campus-700 shadow-md transition hover:bg-blue-50 active:scale-95"
              >
                ↻ Refresh
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-8">
        {error && (
          <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
            ⚠️ {error}
          </div>
        )}

        <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          <div className="stat-card">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Rooms</p>
            <p className="mt-1 text-3xl font-bold text-campus-700">{stats.total}</p>
          </div>
          <div className="stat-card">
            <p className="text-xs font-semibold uppercase tracking-wider text-rose-400">Occupied</p>
            <p className="mt-1 text-3xl font-bold text-rose-600">{stats.occupied}</p>
          </div>
          <div className="stat-card">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-500">Available</p>
            <p className="mt-1 text-3xl font-bold text-emerald-600">{stats.empty}</p>
          </div>
          <div className="stat-card">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Offline</p>
            <p className="mt-1 text-3xl font-bold text-slate-500">{stats.offline}</p>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-sm font-semibold text-slate-600">Filter:</span>
          {FILTER_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                filter === value
                  ? 'bg-campus-600 text-white shadow-md'
                  : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-campus-50'
              }`}
            >
              {label}
              {value !== 'all' && !loading && (
                <span className="ml-1.5 opacity-70">
                  ({value === 'occupied' ? stats.occupied : value === 'empty' ? stats.empty : stats.offline})
                </span>
              )}
            </button>
          ))}
        </div>

        <main className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          <div className="lg:col-span-3">
            <RoomGrid rooms={rooms} filter={filter} loading={loading} />
          </div>
          <div className="lg:col-span-1">
            <SystemHealth />
          </div>
        </main>

        <section className="mt-8">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-semibold text-slate-600">View occupancy history for:</p>
            <select
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm outline-none ring-campus-500 focus:ring-2"
            >
              {rooms.map((room) => (
                <option key={room.roomId} value={room.roomId}>
                  {room.roomId} — {STATUS_CONFIG[room.status].label}
                </option>
              ))}
            </select>
          </div>
          <OccupancyChart roomId={selectedRoom} />
        </section>
      </div>
    </div>
  );
}

export default App;

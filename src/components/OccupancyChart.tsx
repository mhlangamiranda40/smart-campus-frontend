import { useEffect, useState } from 'react';
import { getRoomHistory } from '../api/apiService';
import type { RoomHistory } from '../types';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type ChartPoint = RoomHistory & { occupiedValue: number };

const OccupancyChart = ({ roomId }: { roomId: string }) => {
  const [data, setData] = useState<ChartPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      const history = await getRoomHistory(roomId);
      setData(
        history.map((point) => ({
          ...point,
          occupiedValue: point.occupied ? 1 : 0,
        })),
      );
      setLoading(false);
    };
    fetchHistory();
  }, [roomId]);

  const occupiedMinutes = data.filter((d) => d.occupied).length;

  return (
    <section className="panel overflow-hidden">
      <div className="panel-header">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Occupancy Trend</h2>
          <p className="text-sm text-slate-500">Historical usage for {roomId}</p>
        </div>
        {!loading && (
          <div className="rounded-xl bg-campus-50 px-3 py-2 text-right">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-campus-600">Data points</p>
            <p className="text-sm font-bold text-campus-700">{occupiedMinutes} / {data.length} occupied</p>
          </div>
        )}
      </div>

      <div className="px-5 pb-5">
        {loading ? (
          <div className="flex h-[240px] animate-pulse items-center justify-center rounded-xl bg-slate-50">
            <p className="text-sm text-slate-400">Loading chart...</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="occupancyFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b5bdb" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#3b5bdb" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis
                dataKey="timestamp"
                tickFormatter={(tick) => new Date(tick).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                tick={{ fill: '#64748b', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, 1]}
                ticks={[0, 1]}
                tickFormatter={(value) => (value === 1 ? 'Occupied' : 'Empty')}
                tick={{ fill: '#64748b', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={70}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                }}
                labelFormatter={(label) => new Date(String(label)).toLocaleString()}
              />
              <Area type="stepAfter" dataKey="occupiedValue" fill="url(#occupancyFill)" stroke="none" />
              <Line type="stepAfter" dataKey="occupiedValue" stroke="#3b5bdb" strokeWidth={2.5} dot={{ r: 4, fill: '#3b5bdb' }} />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
};

export default OccupancyChart;

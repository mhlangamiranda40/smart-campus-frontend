import { useEffect, useState } from 'react';
import { getRoomHistory } from '../api/apiService';
import type { RoomHistory } from '../types';import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const OccupancyChart = ({ roomId }: { roomId: string }) => {
  const [data, setData] = useState<RoomHistory[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const history = await getRoomHistory(roomId);
      setData(history);
    };
    fetchHistory();
  }, [roomId]);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold text-lg mb-2">Occupancy Trend – {roomId}</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="timestamp" tickFormatter={(tick) => new Date(tick).toLocaleTimeString()} />
          <YAxis domain={[0, 1]} tickFormatter={(value) => (value === 1 ? 'Occupied' : 'Empty')} />
          <Tooltip labelFormatter={(label) => new Date(label).toLocaleString()} />
          <Line type="stepAfter" dataKey="occupied" stroke="#3b82f6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OccupancyChart;

import type { RoomStatus } from '../types';
const statusColor = {
  occupied: 'bg-red-500',
  empty: 'bg-green-500',
  offline: 'bg-gray-400',
};

const statusLabel = {
  occupied: 'Occupied',
  empty: 'Available',
  offline: 'Offline',
};

const RoomCard = ({ room }: { room: RoomStatus }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 border-l-8" style={{ borderColor: statusColor[room.status] }}>
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-lg">{room.roomId}</h3>
        <span className={`px-3 py-1 rounded-full text-white text-sm font-medium ${statusColor[room.status]}`}>
          {statusLabel[room.status]}
        </span>
      </div>
      <p className="text-gray-500 text-sm mt-2">
        Last motion: {new Date(room.lastUpdated).toLocaleTimeString()}
      </p>
    </div>
  );
};

export default RoomCard;
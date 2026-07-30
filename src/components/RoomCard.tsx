import type { RoomStatus } from '../types';
import { STATUS_CONFIG } from '../constants/roomStatus';

const RoomCard = ({ room }: { room: RoomStatus }) => {
  const config = STATUS_CONFIG[room.status];

  return (
    <article
      className={`panel group overflow-hidden border-l-4 ${config.border} p-5 transition-all duration-200 hover:shadow-xl hover:shadow-slate-300/50`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-xl text-lg font-bold text-white shadow-sm"
            style={{ backgroundColor: config.accent }}
          >
            {room.roomId.slice(0, 2)}
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">{room.roomId}</h3>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Lecture room</p>
          </div>
        </div>
        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${config.badge}`}>
          <span className={`h-2 w-2 rounded-full ${config.dot}`} />
          {config.label}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-slate-50 px-3 py-2">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Last motion</p>
          <p className="mt-0.5 text-sm font-semibold text-slate-700">
            {new Date(room.lastUpdated).toLocaleTimeString()}
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 px-3 py-2">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Sensor</p>
          <p className="mt-0.5 text-sm font-semibold text-slate-700">
            {room.status === 'offline' ? 'No signal' : 'Active'}
          </p>
        </div>
      </div>
    </article>
  );
};

export default RoomCard;

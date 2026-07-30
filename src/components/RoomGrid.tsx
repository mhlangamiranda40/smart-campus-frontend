import type { RoomStatus } from '../types';
import RoomCard from './RoomCard';

interface Props {
  rooms: RoomStatus[];
  filter: RoomStatus['status'] | 'all';
  loading: boolean;
}

const SkeletonCard = () => (
  <div className="panel animate-pulse p-5">
    <div className="flex gap-3">
      <div className="h-11 w-11 rounded-xl bg-slate-200" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-24 rounded bg-slate-200" />
        <div className="h-3 w-16 rounded bg-slate-100" />
      </div>
    </div>
    <div className="mt-4 grid grid-cols-2 gap-3">
      <div className="h-14 rounded-xl bg-slate-100" />
      <div className="h-14 rounded-xl bg-slate-100" />
    </div>
  </div>
);

const RoomGrid = ({ rooms, filter, loading }: Props) => {
  const filtered = filter === 'all' ? rooms : rooms.filter((r) => r.status === filter);

  return (
    <section className="panel overflow-hidden">
      <div className="panel-header">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Live Room Status</h2>
          <p className="text-sm text-slate-500">Motion sensors across campus buildings</p>
        </div>
        <span className="rounded-full bg-campus-50 px-3 py-1 text-xs font-semibold text-campus-700">
          {filtered.length} room{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="p-5">
        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <SkeletonCard key={n} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 py-12 text-center">
            <span className="text-3xl">🔍</span>
            <p className="mt-2 font-semibold text-slate-600">No rooms match this filter</p>
            <p className="text-sm text-slate-400">Try selecting a different status above</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((room) => (
              <RoomCard key={room.roomId} room={room} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RoomGrid;

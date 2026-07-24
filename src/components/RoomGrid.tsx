import type { RoomStatus } from '../types';import RoomCard from './RoomCard';

interface Props {
  rooms: RoomStatus[];
}

const RoomGrid = ({ rooms }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {rooms.map((room) => (
        <RoomCard key={room.roomId} room={room} />
      ))}
    </div>
  );
};

export default RoomGrid;

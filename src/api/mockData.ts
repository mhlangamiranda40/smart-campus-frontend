import type { RoomStatus, SystemHealth } from '../types';const now = new Date().toISOString();

export const mockRooms: RoomStatus[] = [
  { roomId: 'LT1', status: 'occupied', lastUpdated: now },
  { roomId: 'ENG_301', status: 'empty', lastUpdated: now },
  { roomId: 'SCI_101', status: 'offline', lastUpdated: now },
];

export const mockHistory = [
  { timestamp: new Date(Date.now() - 3600000).toISOString(), occupied: true },
  { timestamp: new Date(Date.now() - 1800000).toISOString(), occupied: false },
  { timestamp: now, occupied: true },
];

export const mockHealth: SystemHealth = {
  esp32Online: true,
  lastHeartbeat: now,
  signalStrength: -65,
};

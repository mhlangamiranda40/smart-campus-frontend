export interface RoomStatus {
  roomId: string;
  status: 'occupied' | 'empty' | 'offline';
  lastUpdated: string;
}

export interface RoomHistory {
  timestamp: string;
  occupied: boolean;
}

export interface SystemHealth {
  esp32Online: boolean;
  lastHeartbeat: string;
  signalStrength: number;
}

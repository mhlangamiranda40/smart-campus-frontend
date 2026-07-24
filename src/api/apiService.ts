import axios from 'axios';
import { mockRooms, mockHistory, mockHealth } from './mockData';
import type { RoomStatus, RoomHistory, SystemHealth } from '../types';
const API_BASE = import.meta.env.VITE_API_BASE_URL;
const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA === 'true';

const apiClient = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((config) => {
  config.headers['x-api-key'] = import.meta.env.VITE_API_KEY || 'dummy-key';
  return config;
});

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getRoomsStatus = async (): Promise<RoomStatus[]> => {
  if (USE_MOCK) {
    await delay(300);
    return mockRooms.map(room => ({
      ...room,
      lastUpdated: new Date().toISOString(),
    }));
  }
  const response = await apiClient.get('/api/rooms/status');
  return response.data;
};

export const getRoomHistory = async (roomId: string): Promise<RoomHistory[]> => {
  if (USE_MOCK) {
    await delay(200);
    return mockHistory;
  }
  const response = await apiClient.get(`/api/rooms/${roomId}/history`);
  return response.data;
};

export const getSystemHealth = async (): Promise<SystemHealth> => {
  if (USE_MOCK) {
    await delay(150);
    return mockHealth;
  }
  const response = await apiClient.get('/api/system/health');
  return response.data;
};
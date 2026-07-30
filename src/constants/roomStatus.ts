import type { RoomStatus } from '../types';

export const STATUS_CONFIG: Record<
  RoomStatus['status'],
  {
    label: string;
    dot: string;
    badge: string;
    border: string;
    accent: string;
    icon: string;
  }
> = {
  occupied: {
    label: 'Occupied',
    dot: 'bg-rose-500',
    badge: 'bg-rose-100 text-rose-700 ring-rose-200',
    border: 'border-rose-400',
    accent: '#f43f5e',
    icon: '👤',
  },
  empty: {
    label: 'Available',
    dot: 'bg-emerald-500',
    badge: 'bg-emerald-100 text-emerald-700 ring-emerald-200',
    border: 'border-emerald-400',
    accent: '#10b981',
    icon: '✓',
  },
  offline: {
    label: 'Offline',
    dot: 'bg-slate-400',
    badge: 'bg-slate-100 text-slate-600 ring-slate-200',
    border: 'border-slate-300',
    accent: '#94a3b8',
    icon: '⚡',
  },
};

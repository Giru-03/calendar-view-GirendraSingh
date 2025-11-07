import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CalendarEvent } from '@/components/Calendar/CalendarView.types';

interface EventStore {
  events: CalendarEvent[];
  addEvent: (event: CalendarEvent) => void;
  updateEvent: (id: string, updates: Partial<CalendarEvent>) => void;
  deleteEvent: (id: string) => void;
}

export const useEventStore = create<EventStore>()(
  persist(
    (set) => ({
      events: [],
      addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
      updateEvent: (id, updates) => set((state) => ({
        events: state.events.map((ev) => ev.id === id ? { ...ev, ...updates } : ev),
      })),
      deleteEvent: (id) => set((state) => ({
        events: state.events.filter((ev) => ev.id !== id),
      })),
    }),
    { name: 'calendar-events' }
  )
);
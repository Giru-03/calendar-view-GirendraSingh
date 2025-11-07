import { CalendarEvent } from '@/components/Calendar/CalendarView.types';
import { isSameDayFn } from './date.utils';

export const getEventsForDay = (events: CalendarEvent[], day: Date): CalendarEvent[] => {
  return events.filter(event => isSameDayFn(event.startDate, day));
};

export const sortEvents = (events: CalendarEvent[]): CalendarEvent[] => {
  return [...events].sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
};

export const generateEventId = (): string => {
  return crypto.randomUUID();
};

// Detect overlapping events for week view
export const getOverlappingGroups = (events: CalendarEvent[]): CalendarEvent[][] => {
  const sorted = sortEvents(events);
  const groups: CalendarEvent[][] = [];
  sorted.forEach(event => {
    let placed = false;
    for (const group of groups) {
      if (!group.some(e => e.endDate > event.startDate && e.startDate < event.endDate)) {
        group.push(event);
        placed = true;
        break;
      }
    }
    if (!placed) {
      groups.push([event]);
    }
  });
  return groups;
};
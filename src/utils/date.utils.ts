import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  addDays,
  isSameDay,
  format,
  differenceInDays,
  differenceInMinutes,
  isBefore,
  set,
  startOfDay,
  addMinutes as dfAddMinutes,
} from 'date-fns';
import { isSameMonth as dfIsSameMonth } from 'date-fns';

export const daysBetween = (start: Date, end: Date): number => {
  return differenceInDays(end, start);
};

export const isSameDayFn = (date1: Date, date2: Date): boolean => {
  return isSameDay(date1, date2);
};

export const isSameMonth = (date1: Date, date2: Date): boolean => {
  return dfIsSameMonth(date1, date2);
};

export const getDaysInMonthFn = (date: Date): Date[] => {
  const start = startOfMonth(date);
  const daysCount = differenceInDays(endOfMonth(date), start) + 1;
  return Array.from({ length: daysCount }, (_, i) => addDays(start, i));
};

export const getCalendarGrid = (date: Date): Date[] => {
  const firstDay = startOfMonth(date);
  const startDate = startOfWeek(firstDay, { weekStartsOn: 0 }); // Sunday start
  const grid: Date[] = [];
  for (let i = 0; i < 42; i++) {
    grid.push(addDays(startDate, i));
  }
  return grid;
};

export const getWeekDays = (date: Date): Date[] => {
  const start = startOfWeek(date, { weekStartsOn: 0 });
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
};

export const formatDate = (date: Date, fmt: string): string => {
  return format(date, fmt);
};

export const normalizeDate = (date: Date): Date => startOfDay(date);

export const isDateInRange = (date: Date, start: Date, end: Date): boolean => {
  return !isBefore(date, start) && isBefore(date, end);
};

export const getEventDuration = (start: Date, end: Date): number => {
  return differenceInMinutes(end, start);
};

export const setTime = (date: Date, hours: number, minutes: number): Date => {
  return set(date, { hours, minutes });
};

export const addMinutes = (date: Date, minutes: number): Date => {
  // use date-fns addMinutes alias
  return dfAddMinutes(date, minutes);
};

// More utilities as needed
import { useState, useCallback } from 'react';
import { addMonths, subMonths, startOfMonth } from 'date-fns';

interface CalendarState {
  currentDate: Date;
  view: 'month' | 'week';
  selectedDate: Date | null;
}

export const useCalendar = (initialDate: Date = new Date(), initialView: 'month' | 'week' = 'month') => {
  const [state, setState] = useState<CalendarState>({
    currentDate: startOfMonth(initialDate),
    view: initialView,
    selectedDate: null,
  });

  const goToNext = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentDate: addMonths(prev.currentDate, 1),
    }));
  }, []);

  const goToPrevious = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentDate: subMonths(prev.currentDate, 1),
    }));
  }, []);

  const goToToday = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentDate: startOfMonth(new Date()),
    }));
  }, []);

  const toggleView = useCallback(() => {
    setState(prev => ({
      ...prev,
      view: prev.view === 'month' ? 'week' : 'month',
    }));
  }, []);

  const setSelectedDate = useCallback((date: Date | null) => {
    setState(prev => ({
      ...prev,
      selectedDate: date,
    }));
  }, []);

  return {
    ...state,
    goToNext,
    goToPrevious,
    goToToday,
    toggleView,
    setSelectedDate,
  };
};
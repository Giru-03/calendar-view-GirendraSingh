import React from 'react';
import { CalendarEvent } from './CalendarView.types';
import { CalendarCell } from './CalendarCell';
import { getCalendarGrid, isSameDayFn } from '@/utils/date.utils';

interface MonthViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  onEventSelect: (event: CalendarEvent) => void;
}

export const MonthView: React.FC<MonthViewProps> = ({
  currentDate,
  events,
  selectedDate,
  onDateSelect,
  onEventSelect,
}) => {
  const grid = getCalendarGrid(currentDate);
  const today = new Date();

  return (
    <div className="grid grid-cols-7 gap-0">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
        <div key={day} className="text-center font-medium text-neutral-500 py-2 border-b border-neutral-200">
          {day}
        </div>
      ))}
      {grid.map((date) => (
        <CalendarCell
          key={date.toISOString()}
          date={date}
          currentMonth={currentDate}
          events={events}
          isToday={isSameDayFn(date, today)}
          isSelected={selectedDate ? isSameDayFn(date, selectedDate) : false}
          onClick={onDateSelect}
          onEventClick={onEventSelect}
        />
      ))}
    </div>
  );
};
import React, { useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { CalendarEvent } from './CalendarView.types';
import { isSameMonth, formatDate } from '@/utils/date.utils';
import { getEventsForDay } from '@/utils/event.utils';
import { Tooltip } from '../primitives/Tooltip';

interface CalendarCellProps {
  date: Date;
  currentMonth: Date;
  events: CalendarEvent[];
  isToday: boolean;
  isSelected: boolean;
  onClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

export const CalendarCell = React.memo<CalendarCellProps>(({ 
  date, 
  currentMonth, 
  events, 
  isToday, 
  isSelected, 
  onClick, 
  onEventClick 
}) => {
  const dayEvents = useMemo(() => getEventsForDay(events, date), [events, date]);

  const handleClick = useCallback(() => onClick(date), [onClick, date]);

  const isCurrentMonth = isSameMonth(date, currentMonth);

  return (
    <motion.div 
      role="button"
      tabIndex={0}
      aria-label={`${formatDate(date, 'MMMM d, yyyy')}. ${dayEvents.length} events.`}
      aria-pressed={isSelected}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      className={clsx(
        'border border-neutral-200 h-32 p-2 hover:bg-neutral-50 transition-colors cursor-pointer',
        !isCurrentMonth && 'text-neutral-400 bg-neutral-50',
        isSelected && 'bg-primary-50 border-primary-500'
      )}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.1 }}
    >
      <div className="flex justify-between items-start mb-1">
        <span className="text-sm font-medium">{formatDate(date, 'd')}</span>
        {isToday && (
          <span className="w-6 h-6 bg-primary-500 rounded-full text-white text-xs flex items-center justify-center">
            {formatDate(date, 'd')}
          </span>
        )}
      </div>
      <div className="space-y-1 overflow-hidden">
        {dayEvents.slice(0, 3).map((event) => (
          <Tooltip key={event.id} content={`${event.title}: ${event.description || ''}`}>
            <div
              className="text-xs px-2 py-1 rounded truncate text-white"
              style={{ backgroundColor: event.color }}
              onClick={(e) => {
                e.stopPropagation();
                onEventClick(event);
              }}
            >
              {event.title}
            </div>
          </Tooltip>
        ))}
        {dayEvents.length > 3 && (
          <button className="text-xs text-primary-600 hover:underline">
            +{dayEvents.length - 3} more
          </button>
        )}
      </div>
    </motion.div>
  );
});
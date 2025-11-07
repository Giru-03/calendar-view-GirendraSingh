import React from 'react';
import { CalendarEvent } from './CalendarView.types';
import { getWeekDays, formatDate } from '@/utils/date.utils';
import { getEventsForDay, sortEvents } from '@/utils/event.utils';
import { Tooltip } from '../primitives/Tooltip';

interface MobileViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onEventSelect: (event: CalendarEvent) => void;
  onDateSelect: (date: Date) => void;
}

export const MobileView: React.FC<MobileViewProps> = ({
  currentDate,
  events,
  onEventSelect,
  onDateSelect,
}) => {
  const days = getWeekDays(currentDate);

  return (
    <div className="space-y-4">
      {days.map((day) => {
        const dayEvents = sortEvents(getEventsForDay(events, day));
        return (
          <details key={day.toISOString()} className="border border-neutral-200 rounded-md">
            <summary className="p-2 font-medium cursor-pointer flex justify-between">
              {formatDate(day, 'EEEE, MMMM d')}
              <span className="text-primary-500">({dayEvents.length})</span>
            </summary>
            <div className="p-2 space-y-2">
              {dayEvents.length === 0 ? (
                <p className="text-neutral-500">No events</p>
              ) : (
                dayEvents.map((event) => (
                  <Tooltip key={event.id} content={event.description || ''}>
                    <div
                      className="p-2 rounded-md text-sm"
                      style={{ backgroundColor: `${event.color}20` }}
                      onClick={() => onEventSelect(event)}
                    >
                      <div className="font-medium">{event.title}</div>
                      <div>{formatDate(event.startDate, 'HH:mm')} - {formatDate(event.endDate, 'HH:mm')}</div>
                    </div>
                  </Tooltip>
                ))
              )}
              <button 
                className="text-primary-600 text-sm"
                onClick={() => onDateSelect(day)}
              >
                Add Event
              </button>
            </div>
          </details>
        );
      })}
    </div>
  );
};
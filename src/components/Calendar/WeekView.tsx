import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarEvent } from './CalendarView.types';
import { getWeekDays, formatDate, getEventDuration, setTime, addMinutes } from '@/utils/date.utils';
import { getEventsForDay, sortEvents, getOverlappingGroups } from '@/utils/event.utils';
import { Tooltip } from '../primitives/Tooltip';

interface WeekViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onDateSelect: (date: Date) => void;
  onEventSelect: (event: CalendarEvent) => void;
  onEventUpdate: (id: string, updates: Partial<CalendarEvent>) => void;
}

const timeSlots = Array.from({ length: 24 }, (_, i) => i);

export const WeekView: React.FC<WeekViewProps> = ({
  currentDate,
  events,
  onDateSelect: _onDateSelect,
  onEventSelect,
  onEventUpdate,
}) => {
  const days = getWeekDays(currentDate);
  const [draggingEvent, setDraggingEvent] = useState<{ id: string; startY: number; originalStart: Date } | null>(null);

  const handleMouseDown = (e: React.MouseEvent, event: CalendarEvent) => {
    e.stopPropagation();
    setDraggingEvent({
      id: event.id,
      startY: e.clientY,
      originalStart: event.startDate,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggingEvent) return;
    const deltaY = e.clientY - draggingEvent.startY;
    const minutesDelta = Math.round(deltaY / (60 / 60)); // Assuming 60px per hour
    const newStart = addMinutes(draggingEvent.originalStart, minutesDelta);
    const originalEnd = events.find(ev => ev.id === draggingEvent.id)?.endDate || draggingEvent.originalStart;
    onEventUpdate(draggingEvent.id, {
      startDate: newStart,
      endDate: addMinutes(newStart, getEventDuration(draggingEvent.originalStart, originalEnd)),
    });
  };

  const handleMouseUp = () => {
    setDraggingEvent(null);
  };

  // reference _onDateSelect so TS/linters don't complain when unused in this view
  void _onDateSelect;

  return (
    <div className="overflow-auto" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <div className="grid grid-cols-8">
        <div /> {/* Empty for time */}
        {days.map((day) => (
          <div key={day.toISOString()} className="text-center py-2 border-b">
            {formatDate(day, 'EEE d')}
          </div>
        ))}
      </div>
      <div className="relative grid grid-cols-8" style={{ height: '1440px' }}>
        {timeSlots.map((hour) => (
          <React.Fragment key={hour}>
            <div className="text-right pr-2 border-r text-sm text-neutral-500" style={{ height: '60px' }}>
              {formatDate(setTime(new Date(), hour, 0), 'ha')}
            </div>
            {days.map((_, i) => (
              <div key={i} className="border-b border-r" style={{ height: '60px' }} />
            ))}
          </React.Fragment>
        ))}
        {days.map((day, dayIndex) => {
          const dayEvents = sortEvents(getEventsForDay(events, day));
          const groups = getOverlappingGroups(dayEvents);
          const maxColumns = groups.length || 1;
          return dayEvents.map((event) => {
            const top = (event.startDate.getHours() * 60 + event.startDate.getMinutes());
            const height = getEventDuration(event.startDate, event.endDate);
            const groupIndex = groups.findIndex(g => g.includes(event));
            const columnWidth = 100 / maxColumns;
            const left = (groupIndex === -1 ? 0 : groupIndex) * columnWidth;
            return (
              <Tooltip key={event.id} content={event.description || ''}>
                <motion.div
                  className="absolute p-1 rounded text-xs text-white cursor-pointer"
                  style={{
                    top: `${top}px`,
                    height: `${height}px`,
                    left: `${(dayIndex + 1) * (100 / 8)}%`,
                    width: `${(100 / 8) * (columnWidth / 100)}%`,
                    transform: `translateX(${left}%)`,
                    backgroundColor: event.color,
                  }}
                  onClick={() => onEventSelect(event)}
                  onMouseDown={(e) => handleMouseDown(e, event)}
                  whileHover={{ scale: 1.05 }}
                >
                  {event.title}
                  <br />
                  {formatDate(event.startDate, 'HH:mm')} - {formatDate(event.endDate, 'HH:mm')}
                </motion.div>
              </Tooltip>
            );
          });
        })}
      </div>
    </div>
  );
};
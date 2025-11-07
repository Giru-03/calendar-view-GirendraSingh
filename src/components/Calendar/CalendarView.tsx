import React, { useState } from 'react';
import { CalendarViewProps, CalendarEvent } from './CalendarView.types';
import { useCalendar } from '@/hooks/useCalendar';
import { MonthView } from './MonthView';
import { WeekView } from './WeekView';
import { MobileView } from './MobileView';
import { EventModal } from './EventModal';
import { Button } from '../primitives/Button';
import { formatDate } from '@/utils/date.utils';
import { generateEventId } from '@/utils/event.utils';
import { useEventStore } from '@/hooks/useEventManager';
import { useThemeStore } from '@/hooks/useTheme';

export const CalendarView: React.FC<CalendarViewProps> = ({
  initialView = 'month',
  initialDate = new Date(),
}) => {
  const { events, addEvent, updateEvent, deleteEvent } = useEventStore();
  const { theme, toggleTheme } = useThemeStore();
  const {
    currentDate,
    view,
    selectedDate,
    goToNext,
    goToPrevious,
    goToToday,
    toggleView,
    setSelectedDate,
  } = useCalendar(initialDate, initialView);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setEditingEvent(null);
    setModalOpen(true);
  };

  const handleEventSelect = (event: CalendarEvent) => {
    setEditingEvent(event);
    setSelectedDate(event.startDate);
    setModalOpen(true);
  };

  const handleSave = (data: Partial<CalendarEvent>) => {
    if (editingEvent) {
      updateEvent(editingEvent.id, data);
    } else {
      addEvent({
        id: generateEventId(),
        ...data,
      } as CalendarEvent);
    }
  };

  const handleDelete = () => {
    if (editingEvent) {
      deleteEvent(editingEvent.id);
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-card p-4 ${theme}`} >
      <div className="flex justify-between items-center mb-4">
        <div className="text-xl font-bold">{formatDate(currentDate, 'MMMM yyyy')}</div>
        <div className="space-x-2">
          <Button size="sm" onClick={goToPrevious}>Previous</Button>
          <Button size="sm" onClick={goToToday}>Today</Button>
          <Button size="sm" onClick={goToNext}>Next</Button>
          <Button size="sm" onClick={toggleView}>{view === 'month' ? 'Week' : 'Month'}</Button>
          <Button size="sm" onClick={toggleTheme}>{theme === 'light' ? 'Dark' : 'Light'}</Button>
        </div>
      </div>
      <div className="md:hidden">
        <MobileView
          currentDate={currentDate}
          events={events}
          onDateSelect={handleDateSelect}
          onEventSelect={handleEventSelect}
        />
      </div>
      <div className="hidden md:block">
        {view === 'month' ? (
          <MonthView
            currentDate={currentDate}
            events={events}
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            onEventSelect={handleEventSelect}
          />
        ) : (
          <WeekView
            currentDate={currentDate}
            events={events}
            onDateSelect={handleDateSelect}
            onEventSelect={handleEventSelect}
            onEventUpdate={updateEvent}
          />
        )}
      </div>
      <EventModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        onDelete={editingEvent ? handleDelete : undefined}
        initialData={editingEvent || undefined}
        defaultDate={selectedDate || undefined}
      />
    </div>
  );
};
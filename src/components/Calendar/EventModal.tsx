import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarEvent } from './CalendarView.types';
import { Button } from '../primitives/Button';
import { Modal } from '../primitives/Modal';
import { formatDate, addMinutes } from '@/utils/date.utils';
import { Select } from '../primitives/Select';
import { isBefore } from 'date-fns';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Partial<CalendarEvent>) => void;
  onDelete?: () => void;
  initialData?: CalendarEvent;
  defaultDate?: Date;
}

const colors = [
  { value: '#3b82f6', label: 'Blue' },
  { value: '#10b981', label: 'Green' },
  { value: '#f59e0b', label: 'Yellow' },
  { value: '#ef4444', label: 'Red' },
  { value: '#8b5cf6', label: 'Purple' },
];

const categories = [
  { value: 'Meeting', label: 'Meeting' },
  { value: 'Design', label: 'Design' },
  { value: 'Work', label: 'Work' },
];

export const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  initialData,
  defaultDate,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(defaultDate || new Date());
  const [endDate, setEndDate] = useState(addMinutes(defaultDate || new Date(), 30));
  const [color, setColor] = useState(colors[0].value);
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description || '');
      setStartDate(initialData.startDate);
      setEndDate(initialData.endDate);
      setColor(initialData.color || colors[0].value);
      setCategory(initialData.category || '');
    } else if (defaultDate) {
      setStartDate(defaultDate);
      setEndDate(addMinutes(defaultDate, 30));
    }
  }, [initialData, defaultDate]);

  const handleSave = () => {
    if (title.trim() === '' || isBefore(endDate, startDate)) return;
    onSave({
      title,
      description,
      startDate,
      endDate,
      color,
      category: category || undefined,
    });
    onClose();
  };

  const isEdit = !!initialData;

  return (
    <AnimatePresence>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          title={isEdit ? 'Edit Event' : 'Create Event'}
          description={isEdit ? 'Update event details below' : 'Add new event details below'}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={100}
                className="w-full border border-neutral-300 rounded-md px-3 py-2 dark:border-neutral-600 dark:bg-neutral-700"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={500}
                className="w-full border border-neutral-300 rounded-md px-3 py-2 dark:border-neutral-600 dark:bg-neutral-700"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Start Date</label>
                <input
                  type="datetime-local"
                  value={formatDate(startDate, "yyyy-MM-dd'T'HH:mm")}
                  onChange={(e) => setStartDate(new Date(e.target.value))}
                  className="w-full border border-neutral-300 rounded-md px-3 py-2 dark:border-neutral-600 dark:bg-neutral-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">End Date</label>
                <input
                  type="datetime-local"
                  value={formatDate(endDate, "yyyy-MM-dd'T'HH:mm")}
                  onChange={(e) => setEndDate(new Date(e.target.value))}
                  className="w-full border border-neutral-300 rounded-md px-3 py-2 dark:border-neutral-600 dark:bg-neutral-700"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Color</label>
              <Select 
                options={colors} 
                value={color} 
                onChange={(e) => setColor(e.target.value)}
                className="dark:bg-neutral-700 dark:border-neutral-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <Select 
                options={[{ value: '', label: 'None' }, ...categories]} 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                className="dark:bg-neutral-700 dark:border-neutral-600"
              />
            </div>
            <div className="flex justify-end space-x-2">
              {isEdit && onDelete && (
                <Button variant="destructive" onClick={onDelete}>
                  Delete
                </Button>
              )}
              <Button variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save
              </Button>
            </div>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
};
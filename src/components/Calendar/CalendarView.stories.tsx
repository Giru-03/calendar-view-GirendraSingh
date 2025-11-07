import type { Meta, StoryObj } from '@storybook/react';
import { CalendarView } from './CalendarView';
import { sampleEvents } from './sampleEvents';

const meta = {
  title: 'Calendar/CalendarView',
  component: CalendarView,
  parameters: {
    layout: 'centered',
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CalendarView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    events: sampleEvents,
    onEventAdd: () => {},
    onEventUpdate: () => {},
    onEventDelete: () => {},
  },
};

export const Empty: Story = {
  args: {
    events: [],
    onEventAdd: () => {},
    onEventUpdate: () => {},
    onEventDelete: () => {},
  },
};

export const WeekView: Story = {
  args: {
    events: sampleEvents,
    initialView: 'week',
    onEventAdd: () => {},
    onEventUpdate: () => {},
    onEventDelete: () => {},
  },
};

export const WithManyEvents: Story = {
  args: {
    events: [...sampleEvents, /* duplicate or add more for 20+ */],
    onEventAdd: () => {},
    onEventUpdate: () => {},
    onEventDelete: () => {},
  },
};

export const InteractiveDemo: Story = {
  args: {
    events: sampleEvents,
    onEventAdd: () => {},
    onEventUpdate: () => {},
    onEventDelete: () => {},
  },
};

export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  args: {
    events: sampleEvents,
    onEventAdd: () => {},
    onEventUpdate: () => {},
    onEventDelete: () => {},
  },
};

export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  args: {
    events: sampleEvents,
    onEventAdd: () => {},
    onEventUpdate: () => {},
    onEventDelete: () => {},
  },
  // Simulate dark mode by setting theme in store or wrapper
};
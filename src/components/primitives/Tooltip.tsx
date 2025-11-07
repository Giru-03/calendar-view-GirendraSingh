import React, { useState, ReactNode } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface TooltipProps {
  children: ReactNode;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export const Tooltip: React.FC<TooltipProps> = ({ children, content, position = 'top' }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {children}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className={clsx(
            'absolute z-50 px-2 py-1 text-xs text-white bg-neutral-900 rounded-md shadow-md whitespace-nowrap',
            {
              'bottom-full left-1/2 -translate-x-1/2 mb-2': position === 'top',
              'top-full left-1/2 -translate-x-1/2 mt-2': position === 'bottom',
              'right-full top-1/2 -translate-y-1/2 mr-2': position === 'left',
              'left-full top-1/2 -translate-y-1/2 ml-2': position === 'right',
            }
          )}
        >
          {content}
          <div
            className={clsx('absolute w-0 h-0 border-4 border-transparent', {
                '-bottom-1 left-1/2 border-t-neutral-900 -translate-x-1/2': position === 'top',
                '-top-1 left-1/2 border-b-neutral-900 -translate-x-1/2': position === 'bottom',
                '-right-1 top-1/2 border-l-neutral-900 -translate-y-1/2': position === 'left',
                '-left-1 top-1/2 border-r-neutral-900 -translate-y-1/2': position === 'right',
            })}
          />
        </motion.div>
      )}
    </div>
  );
};
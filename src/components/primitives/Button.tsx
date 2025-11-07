import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={clsx(
        'font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
        {
          'bg-primary-500 text-white hover:bg-primary-600': variant === 'primary',
          'bg-neutral-200 text-neutral-900 hover:bg-neutral-300': variant === 'secondary',
          'bg-error-500 text-white hover:bg-error-600': variant === 'destructive',
        },
        {
          'px-3 py-1 text-sm': size === 'sm',
          'px-4 py-2 text-base': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
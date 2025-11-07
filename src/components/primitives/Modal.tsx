import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  description?: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title, description }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby={description ? 'modal-description' : undefined}
        className={clsx('bg-white rounded-xl p-6 max-w-md w-full shadow-modal')}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="modal-title" className="text-xl font-bold mb-2">
          {title}
        </h2>
        {description && <div id="modal-description" className="text-sm text-neutral-600 mb-4">{description}</div>}
        {children}
      </div>
    </div>,
    document.body
  );
};
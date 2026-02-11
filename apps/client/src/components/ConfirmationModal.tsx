import React, { ReactNode } from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  children?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmButtonVariant?: 'primary' | 'danger' | 'success';
}

export function ConfirmationModal({
  isOpen,
  onCancel,
  onConfirm,
  title,
  description,
  children,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  confirmButtonVariant = 'primary',
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700',
    danger: 'bg-red-600 hover:bg-red-700',
    success: 'bg-green-600 hover:bg-green-700',
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-300">
        <h2 className={`text-2xl font-bold text-gray-900 ${description ? 'mb-1' : 'mb-6'}`}>
          {title}
        </h2>
        {description && <p className="text-gray-500 mb-6">{description}</p>}
        {children}
        <div className="flex gap-4 mt-6">
          <button
            onClick={onCancel}
            className="flex-1 py-3 px-6 border border-gray-200 rounded-xl text-gray-600 font-semibold hover:bg-gray-50 transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-3 px-6 rounded-xl text-white font-semibold transition-colors ${variantClasses[confirmButtonVariant]}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

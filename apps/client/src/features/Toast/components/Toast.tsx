import { useEffect } from 'react';
import { CheckCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

export type ToastType = 'success' | 'error';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

export function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-2 fade-in duration-300">
      <div
        className={`rounded-xl shadow-lg border p-4 flex items-center gap-3 min-w-[300px] max-w-md bg-white ${type === 'success' ? 'border-green-100' : 'border-red-100'}`}
      >
        {type === 'success' ? (
          <CheckCircleIcon className="h-6 w-6 text-green-500 flex-shrink-0" />
        ) : (
          <XCircleIcon className="h-6 w-6 text-red-500 flex-shrink-0" />
        )}

        <p className="text-sm font-medium text-gray-900 flex-1">{message}</p>

        <button onClick={onClose} className="text-gray-400 hover:text-gray-500 p-1">
          <XMarkIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

import { SubmissionState } from 'graphql-server';
import { ConfirmationModal } from '@/components/ConfirmationModal';
import { useState } from 'react';

interface FeedbackModalProps {
  isOpen: boolean;
  state: SubmissionState | null;
  onCancel: () => void;
  onConfirm: (text: string) => void;
}

export function FeedbackModal({ isOpen, state, onCancel, onConfirm }: FeedbackModalProps) {
  const [text, setText] = useState('');

  const handleConfirm = () => {
    onConfirm(text);
  };

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onCancel={onCancel}
      onConfirm={handleConfirm}
      title={state === SubmissionState.APPROVED ? 'Approve Grant' : 'Reject Grant'}
      description="Please provide some feedback regarding your decision."
      confirmButtonVariant={state === SubmissionState.APPROVED ? 'success' : 'danger'}
      confirmLabel="Confirm"
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-32 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-300"
        placeholder="Why are you taking this action?..."
      />
    </ConfirmationModal>
  );
}

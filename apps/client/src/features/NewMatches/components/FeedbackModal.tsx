import { SubmissionState } from 'graphql-server';
import { ConfirmationModal } from '@/components/ConfirmationModal';

interface FeedbackModalProps {
  isOpen: boolean;
  state: SubmissionState | null;
  text: string;
  onTextChange: (text: string) => void;
  onCancel: () => void;
  onConfirm: () => void;
}

export function FeedbackModal({
  isOpen,
  state,
  text,
  onTextChange,
  onCancel,
  onConfirm,
}: FeedbackModalProps) {
  return (
    <ConfirmationModal
      isOpen={isOpen}
      onCancel={onCancel}
      onConfirm={onConfirm}
      title={state === SubmissionState.APPROVED ? 'Approve Grant' : 'Reject Grant'}
      description="Please provide some feedback regarding your decision."
      confirmButtonVariant={state === SubmissionState.APPROVED ? 'success' : 'danger'}
      confirmLabel="Confirm"
    >
      <textarea
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        className="w-full h-32 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-300"
        placeholder="Why are you taking this action?..."
      />
    </ConfirmationModal>
  );
}

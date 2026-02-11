import { SubmissionState } from 'graphql-server';

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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-300">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {state === SubmissionState.APPROVED ? 'Approve Grant' : 'Reject Grant'}
        </h2>
        <p className="text-gray-500 mb-6">Please provide some feedback regarding your decision.</p>
        <textarea
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          className="w-full h-32 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-300 mb-6"
          placeholder="Why are you taking this action?..."
        />
        <div className="flex gap-4">
          <button
            onClick={onCancel}
            className="flex-1 py-3 px-6 border border-gray-200 rounded-xl text-gray-600 font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-3 px-6 rounded-xl text-white font-semibold transition-colors ${state === SubmissionState.APPROVED ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

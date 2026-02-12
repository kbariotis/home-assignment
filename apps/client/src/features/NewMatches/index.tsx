import { Grant, SubmissionState } from 'graphql-server';
import { useState, useCallback } from 'react';
import { useToast } from '@/features/Toast/ToastContext';
import { GrantCard } from './components/GrantCard';
import { GrantCardSkeleton } from './components/GrantCardSkeleton';
import { FeedbackModal } from './components/FeedbackModal';
import { useGrants } from './hooks/useGrants';
import { useSubmitFeedback } from './hooks/useSubmitFeedback';

export default function NewMatches() {
  const { showToast } = useToast();
  const [feedbackGrantId, setFeedbackGrantId] = useState<string | null>(null);
  const [feedbackState, setFeedbackState] = useState<SubmissionState | null>(null);
  const [processingGrantId, setProcessingGrantId] = useState<string | null>(null);

  const { loading, error, grants } = useGrants(0, 4);

  const { submitFeedback } = useSubmitFeedback();

  const handleSubmitFeedback = useCallback(
    async (text: string) => {
      if (feedbackGrantId && feedbackState) {
        const idToProcess = feedbackGrantId;
        const stateToProcess = feedbackState;

        // Close modal immediately
        setFeedbackGrantId(null);
        setFeedbackState(null);
        setProcessingGrantId(idToProcess);

        try {
          const result = await submitFeedback({
            grantId: idToProcess,
            state: stateToProcess,
            feedback: text,
          });

          if (result.data && 'message' in result.data.submitGrantFeedback) {
            showToast(result.data.submitGrantFeedback.message, 'error');
          } else {
            showToast('Feedback submitted successfully', 'success');
          }
        } catch (e: unknown) {
          const message = e instanceof Error ? e.message : 'An error occurred';
          showToast(message, 'error');
        } finally {
          setProcessingGrantId(null);
        }
      }
    },
    [feedbackGrantId, feedbackState, submitFeedback, showToast],
  );

  const handleAction = useCallback((id: string, state: SubmissionState) => {
    setFeedbackGrantId(id);
    setFeedbackState(state);
  }, []);

  if (error) return <div className="p-8 text-red-500 font-sans">Error: {error.message}</div>;

  return (
    <>
      <header className="mb-4">
        <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">New Matches</h1>
      </header>

      <section className="mb-8">
        {loading ? (
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <GrantCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            {grants?.length === 0 && <p className="text-gray-500">No new matches found.</p>}

            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {grants?.map((grant: Grant) => (
                <GrantCard
                  key={grant.id}
                  grant={grant}
                  isLoading={processingGrantId === grant.id}
                  onApprove={handleAction}
                  onReject={handleAction}
                />
              ))}
            </div>
          </>
        )}
      </section>

      <FeedbackModal
        key={feedbackGrantId}
        isOpen={!!feedbackGrantId}
        state={feedbackState}
        onCancel={() => setFeedbackGrantId(null)}
        onConfirm={handleSubmitFeedback}
      />
    </>
  );
}

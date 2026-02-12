import { Grant, SubmissionState } from 'graphql-server';
import { useState, useCallback } from 'react';
import { GrantCard } from './components/GrantCard';
import { FeedbackModal } from './components/FeedbackModal';
import { useGrants } from './hooks/useGrants';
import { useSubmitFeedback } from './hooks/useSubmitFeedback';

export default function NewMatches() {
  const [feedbackGrantId, setFeedbackGrantId] = useState<string | null>(null);
  const [feedbackState, setFeedbackState] = useState<SubmissionState | null>(null);

  const { loading, error, grants } = useGrants(0, 4);

  const { submitFeedback } = useSubmitFeedback(() => {
    setFeedbackGrantId(null);
  });

  const handleSubmitFeedback = useCallback(
    (text: string) => {
      if (feedbackGrantId && feedbackState) {
        submitFeedback({
          grantId: feedbackGrantId,
          state: feedbackState,
          feedback: text,
        });
      }
    },
    [feedbackGrantId, feedbackState, submitFeedback],
  );

  const handleAction = useCallback((id: string, state: SubmissionState) => {
    setFeedbackGrantId(id);
    setFeedbackState(state);
  }, []);

  if (loading) return <div className="p-8 font-sans">Loading grants...</div>;
  if (error) return <div className="p-8 text-red-500 font-sans">Error: {error.message}</div>;

  return (
    <>
      <header className="mb-4">
        <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">New Matches</h1>
      </header>

      <section className="mb-8">
        {grants?.length === 0 && <p className="text-gray-500">No new matches found.</p>}

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {grants?.map((grant: Grant) => (
            <GrantCard
              key={grant.id}
              grant={grant}
              onApprove={handleAction}
              onReject={handleAction}
            />
          ))}
        </div>
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

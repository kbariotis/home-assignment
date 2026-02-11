import { Grant, SubmissionState } from 'graphql-server';
import { useState } from 'react';
import { GrantCard } from './components/GrantCard';
import { FeedbackModal } from './components/FeedbackModal';
import { useGrants } from './hooks/useGrants';
import { useSubmissions } from '../AllOpportunities/hooks/useSubmissions';
import { useSubmitFeedback } from './hooks/useSubmitFeedback';

export default function NewMatches() {
  const [feedbackGrantId, setFeedbackGrantId] = useState<string | null>(null);
  const [feedbackState, setFeedbackState] = useState<SubmissionState | null>(null);
  const [feedbackText, setFeedbackText] = useState('');

  const { loading, error, grants, refetch } = useGrants(0, 4);
  const { refetch: refetchSubmissions } = useSubmissions();

  const { submitFeedback } = useSubmitFeedback(() => {
    setFeedbackGrantId(null);
    setFeedbackText('');
    refetch();
    refetchSubmissions();
  });

  const handleSubmitFeedback = () => {
    if (feedbackGrantId && feedbackState) {
      submitFeedback({
        grantId: feedbackGrantId,
        state: feedbackState,
        feedback: feedbackText,
      });
    }
  };

  const handleAction = (id: string, state: SubmissionState) => {
    setFeedbackGrantId(id);
    setFeedbackState(state);
  };

  if (loading) return <div className="p-8 font-sans">Loading grants...</div>;
  if (error) return <div className="p-8 text-red-500 font-sans">Error: {error.message}</div>;

  return (
    <>
      <header className="mb-4">
        <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">New Matches</h1>
      </header>

      <section className="mb-8">
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
        isOpen={!!feedbackGrantId}
        state={feedbackState}
        text={feedbackText}
        onTextChange={setFeedbackText}
        onCancel={() => setFeedbackGrantId(null)}
        onConfirm={handleSubmitFeedback}
      />
    </>
  );
}

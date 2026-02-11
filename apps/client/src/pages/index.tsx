import { Grant, SubmissionState } from 'graphql-server';
import Head from 'next/head';
import { useState } from 'react';
import { GrantCard } from '../components/GrantCard';
import { FeedbackModal } from '../components/FeedbackModal';
import { SubmissionsTable } from '../components/SubmissionsTable';
import { useGrants } from '../hooks/useGrants';
import { useSubmissions } from '../hooks/useSubmissions';
import { useSubmitFeedback } from '../hooks/useSubmitFeedback';

export default function GrantsPage() {
  const [feedbackGrantId, setFeedbackGrantId] = useState<string | null>(null);
  const [feedbackState, setFeedbackState] = useState<SubmissionState | null>(null);
  const [feedbackText, setFeedbackText] = useState('');

  const { loading, error, grants, refetch } = useGrants(0, 4);
  const { submissions, refetch: refetchSubmissions } = useSubmissions();

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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <Head>
        <title>Grants | Vee</title>
      </Head>

      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Recent Matches</h1>
          <p className="mt-4 text-lg text-gray-500">
            Explore and apply for grants tailored to your needs.
          </p>
        </header>

        <section className="mb-16">
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

        {submissions && <SubmissionsTable submissions={submissions} />}
      </div>
    </div>
  );
}

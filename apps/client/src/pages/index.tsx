import { useQuery, useMutation } from '@apollo/client/react';
import { gql } from '@apollo/client';
import { Grant, GrantSubmission, SubmissionState } from 'graphql-server';
import Head from 'next/head';
import { useState } from 'react';
import { GrantCard } from '../components/GrantCard';
import { FeedbackModal } from '../components/FeedbackModal';
import { SubmissionsTable } from '../components/SubmissionsTable';

const GET_GRANTS = gql`
  query GetGrants($skip: Int, $take: Int) {
    grants(skip: $skip, take: $take, submitted: false) {
      id
      providerName
      grantTitle
      deadline
      amount
      location
      areas
      submission {
        id
        state
        feedback
      }
    }
  }
`;

const GET_SUBMISSIONS = gql`
  query GetSubmissions {
    submissions {
      id
      state
      feedback
      createdAt
      grant {
        id
        grantTitle
        providerName
      }
    }
  }
`;

const SUBMIT_FEEDBACK = gql`
  mutation SubmitFeedback($grantId: ID!, $state: SubmissionState!, $feedback: String) {
    submitGrantFeedback(grantId: $grantId, state: $state, feedback: $feedback) {
      id
      state
      feedback
    }
  }
`;

interface GrantsData {
  grants: Grant[];
}

interface SubmissionsData {
  submissions: GrantSubmission[];
}

export default function GrantsPage() {
  const [feedbackGrantId, setFeedbackGrantId] = useState<string | null>(null);
  const [feedbackState, setFeedbackState] = useState<SubmissionState | null>(null);
  const [feedbackText, setFeedbackText] = useState('');

  const { loading, error, data, refetch } = useQuery<GrantsData>(GET_GRANTS, {
    variables: { skip: 0, take: 4 },
  });

  const { data: submissionsData, refetch: refetchSubmissions } = useQuery<SubmissionsData>(GET_SUBMISSIONS);

  const [submitFeedback] = useMutation(SUBMIT_FEEDBACK, {
    onCompleted: () => {
      setFeedbackGrantId(null);
      setFeedbackText('');
      refetch();
      refetchSubmissions();
    },
  });

  const handleSubmitFeedback = () => {
    if (feedbackGrantId && feedbackState) {
      submitFeedback({
        variables: {
          grantId: feedbackGrantId,
          state: feedbackState,
          feedback: feedbackText,
        },
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
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Available Grants</h1>
          <p className="mt-4 text-lg text-gray-500">Explore and apply for grants tailored to your needs.</p>
        </header>

        <section className="mb-16">
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {data?.grants?.map((grant: Grant) => (
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

        {submissionsData?.submissions && (
          <SubmissionsTable submissions={submissionsData.submissions} />
        )}
      </div>
    </div>
  );
}

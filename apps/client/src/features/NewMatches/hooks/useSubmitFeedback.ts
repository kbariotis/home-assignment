import { useMutation } from '@apollo/client/react';
import { useCallback } from 'react';
import { gql } from '@apollo/client';
import { SubmissionState } from 'graphql-server';

export const SUBMIT_FEEDBACK = gql`
  mutation SubmitFeedback($grantId: ID!, $state: SubmissionState!, $feedback: String) {
    submitGrantFeedback(grantId: $grantId, state: $state, feedback: $feedback) {
      ... on GrantSubmission {
        id
        state
        feedback
      }
    }
  }
`;

interface SubmitFeedbackVariables {
  grantId: string;
  state: SubmissionState;
  feedback?: string;
}

export function useSubmitFeedback(onCompleted?: () => void) {
  const [mutate, { loading, error }] = useMutation(SUBMIT_FEEDBACK, {
    onCompleted,
    refetchQueries: ['GetSubmissions', 'GetGrants'],
  });

  const submitFeedback = useCallback(
    (variables: SubmitFeedbackVariables) => {
      return mutate({ variables });
    },
    [mutate],
  );

  return {
    submitFeedback,
    loading,
    error,
  };
}

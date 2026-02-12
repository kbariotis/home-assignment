import { useMutation } from '@apollo/client/react';
import { useCallback } from 'react';
import { gql } from '@apollo/client';
import { SubmissionState, SubmitGrantFeedbackInput } from 'graphql-server';

export const SUBMIT_FEEDBACK = gql`
  mutation SubmitFeedback($input: SubmitGrantFeedbackInput!) {
    submitGrantFeedback(input: $input) {
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
      const input: SubmitGrantFeedbackInput = {
        grantId: variables.grantId,
        state: variables.state,
        feedback: variables.feedback,
      };
      return mutate({ variables: { input } });
    },
    [mutate],
  );

  return {
    submitFeedback,
    loading,
    error,
  };
}

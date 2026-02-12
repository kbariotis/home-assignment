import { useMutation } from '@apollo/client/react';
import { useCallback } from 'react';
import { gql } from '@apollo/client';
import { SubmissionState, SubmitGrantFeedbackInput, SubmitFeedbackResult } from 'graphql-server';

export const SUBMIT_FEEDBACK = gql`
  mutation SubmitFeedback($input: SubmitGrantFeedbackInput!) {
    submitGrantFeedback(input: $input) {
      ... on GrantSubmission {
        id
        state
        feedback
      }
      ... on ApplicationError {
        message
      }
    }
  }
`;

interface SubmitFeedbackVariables {
  grantId: string;
  state: SubmissionState;
  feedback?: string;
}

interface SubmitFeedbackData {
  submitGrantFeedback: SubmitFeedbackResult;
}

export function useSubmitFeedback(onCompleted?: () => void) {
  const [mutate, { loading, error }] = useMutation<SubmitFeedbackData>(SUBMIT_FEEDBACK, {
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

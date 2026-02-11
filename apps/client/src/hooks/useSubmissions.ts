import { useQuery } from '@apollo/client/react';
import { gql } from '@apollo/client';
import { GrantSubmission } from 'graphql-server';

export const GET_SUBMISSIONS = gql`
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

interface SubmissionsData {
  submissions: GrantSubmission[];
}

export function useSubmissions() {
  const { data, loading, error, refetch } = useQuery<SubmissionsData>(GET_SUBMISSIONS);

  return {
    loading,
    error,
    submissions: data?.submissions,
    refetch,
  };
}

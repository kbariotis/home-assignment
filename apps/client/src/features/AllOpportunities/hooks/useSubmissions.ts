import { useQuery } from '@apollo/client/react';
import { gql } from '@apollo/client';
import { GrantSubmission } from 'graphql-server';

export const GET_SUBMISSIONS = gql`
  query GetSubmissions($orderBy: SubmissionOrderBy, $orderDir: OrderDirection) {
    submissions(orderBy: $orderBy, orderDir: $orderDir) {
      id
      state
      feedback
      createdAt
      grant {
        id
        grantTitle
        amount
        deadline
        providerName
      }
    }
  }
`;

interface SubmissionsData {
  submissions: GrantSubmission[];
}

export type SubmissionSortKey = 'PROVIDER_NAME' | 'GRANT_TITLE';
export type SubmissionSortDir = 'ASC' | 'DESC';

export interface UseSubmissionsProps {
  orderBy?: SubmissionSortKey;
  orderDir?: SubmissionSortDir;
}

export function useSubmissions({ orderBy, orderDir }: UseSubmissionsProps = {}) {
  const { data, loading, error, refetch } = useQuery<SubmissionsData>(GET_SUBMISSIONS, {
    variables: { orderBy, orderDir },
  });

  return {
    loading,
    error,
    submissions: data?.submissions,
    refetch,
  };
}

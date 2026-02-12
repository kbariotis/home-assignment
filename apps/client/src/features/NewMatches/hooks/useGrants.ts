import { useQuery } from '@apollo/client/react';
import { gql } from '@apollo/client';
import { Grant, GrantFilterInput } from 'graphql-server';

export const GET_GRANTS = gql`
  query GetGrants($input: GrantFilterInput) {
    grants(input: $input) {
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

interface GrantsData {
  grants: Grant[];
}

export function useGrants(skip: number = 0, take: number = 4) {
  const input: GrantFilterInput = { skip, take, submitted: false };
  const { loading, error, data, refetch } = useQuery<GrantsData>(GET_GRANTS, {
    variables: { input },
  });

  return {
    loading,
    error,
    grants: data?.grants,
    refetch,
  };
}

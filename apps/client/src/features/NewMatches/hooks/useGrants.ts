import { useQuery } from '@apollo/client/react';
import { gql } from '@apollo/client';
import { Grant } from 'graphql-server';

export const GET_GRANTS = gql`
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

interface GrantsData {
  grants: Grant[];
}

export function useGrants(skip: number = 0, take: number = 4) {
  const { loading, error, data, refetch } = useQuery<GrantsData>(GET_GRANTS, {
    variables: { skip, take },
  });

  return {
    loading,
    error,
    grants: data?.grants,
    refetch,
  };
}

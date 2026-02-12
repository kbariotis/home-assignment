import { renderHook, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing/react';
import { useSubmissions, GET_SUBMISSIONS } from '../useSubmissions';

const mocks = [
  {
    request: {
      query: GET_SUBMISSIONS,
      variables: {
        orderBy: {
          field: 'PROVIDER_NAME',
          direction: 'DESC',
        },
      },
    },
    result: {
      data: {
        submissions: [
          {
            id: '1',
            state: 'PENDING',
            feedback: null,
            createdAt: '2023-01-01T00:00:00Z',
            grant: {
              id: 'g1',
              grantTitle: 'Test Grant',
              amount: 1000,
              deadline: '2023-12-31T00:00:00Z',
              providerName: 'Provider A',
            },
          },
        ],
      },
    },
  },
];

describe('useSubmissions', () => {
  it('should return loading state initially', () => {
    const { result } = renderHook(() => useSubmissions(), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    expect(result.current.loading).toBe(true);
  });

  it('should return submissions data after loading', async () => {
    const { result } = renderHook(() => useSubmissions(), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.submissions).toBeDefined();
    expect(result.current.submissions!).toHaveLength(1);
    expect(result.current.submissions![0].grant.grantTitle).toBe('Test Grant');
  });

  it('should handle error state', async () => {
    const errorMock = {
      request: {
        query: GET_SUBMISSIONS,
        variables: {
          orderBy: {
            field: 'PROVIDER_NAME',
            direction: 'DESC',
          },
        },
      },
      error: new Error('An error occurred'),
    };

    const { result } = renderHook(() => useSubmissions(), {
      wrapper: ({ children }) => <MockedProvider mocks={[errorMock]}>{children}</MockedProvider>,
    });

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBeDefined();
    expect(result.current.error?.message).toBe('An error occurred');
  });
});

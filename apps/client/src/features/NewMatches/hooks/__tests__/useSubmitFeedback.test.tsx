import { renderHook, act } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing/react';
import { useSubmitFeedback, SUBMIT_FEEDBACK } from '../useSubmitFeedback';
import { SubmissionState } from 'graphql-server';

describe('useSubmitFeedback', () => {
  it('should submit feedback successfully', async () => {
    const onCompletedMock = jest.fn();
    const mocks = [
      {
        request: {
          query: SUBMIT_FEEDBACK,
          variables: {
            grantId: 'g1',
            state: SubmissionState.APPROVED,
            feedback: 'Great!',
          },
        },
        result: {
          data: {
            submitGrantFeedback: {
              id: 's1',
              state: SubmissionState.APPROVED,
              feedback: 'Great!',
            },
          },
        },
      },
    ];

    const { result } = renderHook(() => useSubmitFeedback(onCompletedMock), {
      wrapper: ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>,
    });

    await act(async () => {
      await result.current.submitFeedback({
        grantId: 'g1',
        state: SubmissionState.APPROVED,
        feedback: 'Great!',
      });
    });

    expect(onCompletedMock).toHaveBeenCalled();
  });

  it('should handle error during submission', async () => {
    const errorMock = {
      request: {
        query: SUBMIT_FEEDBACK,
        variables: {
          grantId: 'g1',
          state: SubmissionState.REJECTED,
        },
      },
      error: new Error('Submission failed'),
    };

    const { result } = renderHook(() => useSubmitFeedback(), {
      wrapper: ({ children }) => <MockedProvider mocks={[errorMock]}>{children}</MockedProvider>,
    });

    await act(async () => {
      try {
        await result.current.submitFeedback({
          grantId: 'g1',
          state: SubmissionState.REJECTED,
        });
      } catch (e) {
        // Error is handled by Apollo, but we can check the error state
      }
    });

    expect(result.current.error).toBeDefined();
    expect(result.current.error?.message).toBe('Submission failed');
  });
});

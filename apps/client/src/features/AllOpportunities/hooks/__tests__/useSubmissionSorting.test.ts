import { renderHook, act } from '@testing-library/react';
import { useSubmissionSorting } from '../useSubmissionSorting';

describe('useSubmissionSorting', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useSubmissionSorting());

    expect(result.current.sortKey).toBe('PROVIDER_NAME');
    expect(result.current.sortDirection).toBe('DESC');
  });

  it('should initialize with provided values', () => {
    const { result } = renderHook(() => useSubmissionSorting('GRANT_TITLE', 'ASC'));

    expect(result.current.sortKey).toBe('GRANT_TITLE');
    expect(result.current.sortDirection).toBe('ASC');
  });

  it('should toggle direction when sorting by the same key', () => {
    const { result } = renderHook(() => useSubmissionSorting('PROVIDER_NAME', 'ASC'));

    act(() => {
      result.current.handleSort('PROVIDER_NAME');
    });

    expect(result.current.sortDirection).toBe('DESC');

    act(() => {
      result.current.handleSort('PROVIDER_NAME');
    });

    expect(result.current.sortDirection).toBe('ASC');
  });

  it('should change key and reset direction to DESC when sorting by a new key', () => {
    const { result } = renderHook(() => useSubmissionSorting('PROVIDER_NAME', 'ASC'));

    act(() => {
      result.current.handleSort('GRANT_TITLE');
    });

    expect(result.current.sortKey).toBe('GRANT_TITLE');
    expect(result.current.sortDirection).toBe('DESC');
  });
});

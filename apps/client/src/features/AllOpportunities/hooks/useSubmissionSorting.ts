import { useState } from 'react';
import { SubmissionSortKey, SubmissionSortDir } from './useSubmissions';

export function useSubmissionSorting(
  initialKey: SubmissionSortKey = 'PROVIDER_NAME',
  initialDir: SubmissionSortDir = 'DESC',
) {
  const [sortKey, setSortKey] = useState<SubmissionSortKey>(initialKey);
  const [sortDirection, setSortDirection] = useState<SubmissionSortDir>(initialDir);

  const handleSort = (key: string) => {
    if (key === sortKey) {
      setSortDirection((prevDir) => (prevDir === 'ASC' ? 'DESC' : 'ASC'));
    } else {
      setSortKey(key as SubmissionSortKey);
      setSortDirection('DESC');
    }
  };

  return {
    sortKey,
    sortDirection,
    handleSort,
  };
}

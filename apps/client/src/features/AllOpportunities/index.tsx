import { SubmissionsTable } from './components/SubmissionsTable';
import { useSubmissions } from './hooks/useSubmissions';
import { useSubmissionSorting } from './hooks/useSubmissionSorting';

export default function AllOpportunities() {
  const { sortKey, sortDirection, handleSort } = useSubmissionSorting();

  const { submissions } = useSubmissions({
    orderBy: sortKey,
    orderDir: sortDirection,
  });

  return (
    <>
      <header className="mb-4">
        <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">
          All Grant Opportunities
        </h1>
      </header>
      {submissions && (
        <SubmissionsTable
          submissions={submissions}
          onSort={handleSort}
          currentSortKey={sortKey}
          currentSortDirection={sortDirection}
        />
      )}
    </>
  );
}

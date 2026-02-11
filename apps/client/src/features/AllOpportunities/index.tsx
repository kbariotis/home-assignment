import { SubmissionsTable } from './components/SubmissionsTable';
import { useSubmissions } from './hooks/useSubmissions';

export default function AllOpportunities() {
  const { submissions } = useSubmissions();

  return (
    <>
      <header className="mb-4">
        <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">
          All Grant Opportunities
        </h1>
      </header>
      {submissions && <SubmissionsTable submissions={submissions} />}
    </>
  );
}

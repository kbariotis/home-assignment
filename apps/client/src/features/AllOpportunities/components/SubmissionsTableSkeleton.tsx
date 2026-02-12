import { Table, Column } from '../../../components/Table';

interface SkeletonItem {
  id: number;
}

export function SubmissionsTableSkeleton() {
  const columns: Column<SkeletonItem>[] = [
    {
      header: 'Foundation name',
      render: () => <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />,
    },
    {
      header: 'Grant name',
      render: () => <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />,
    },
    {
      header: 'Average amount',
      render: () => <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />,
    },
    {
      header: 'Status',
      render: () => <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />,
    },
    {
      header: 'Deadline',
      render: () => <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />,
    },
    {
      header: 'Match date',
      render: () => <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />,
    },
  ];

  const skeletonData = Array.from({ length: 2 }).map((_, i) => ({ id: i }));

  return (
    <Table
      data={skeletonData}
      columns={columns}
      keyExtractor={(item) => item.id}
      emptyMessage={null}
    />
  );
}

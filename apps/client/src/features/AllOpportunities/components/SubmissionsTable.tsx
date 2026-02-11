import dayjs from 'dayjs';
import { GrantSubmission } from 'graphql-server';
import { Table, Column } from '../../../components/Table';

interface SubmissionsTableProps {
  submissions: GrantSubmission[];
}

export function SubmissionsTable({ submissions }: SubmissionsTableProps) {
  const columns: Column<GrantSubmission>[] = [
    {
      header: 'Foundation name',
      render: (submission) => <div className="text-gray-500">{submission.grant.providerName}</div>,
    },
    {
      header: 'Grant name',
      render: (submission) => <div className="text-gray-500">{submission.grant.grantTitle}</div>,
    },
    {
      header: 'Average amount',
      render: (submission) => (
        <div className="text-gray-500 flex items-center">
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumSignificantDigits: 3,
          }).format(Number(submission.grant.amount))}
        </div>
      ),
    },
    {
      header: 'Status',
      className: 'whitespace-nowrap',
      render: (submission) => (
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
            submission.state === 'APPROVED'
              ? 'bg-green-50 text-green-700 border border-green-100'
              : 'bg-red-50 text-red-700 border border-red-100'
          }`}
        >
          {submission.state}
        </span>
      ),
    },
    {
      header: 'Deadline',
      render: (submission) => (
        <div className="text-gray-500 line-clamp-1">
          {submission.grant.deadline ? dayjs(submission.grant.deadline).format('MMMM Do') : ''}
        </div>
      ),
    },
    {
      header: 'Match date',
      className: 'whitespace-nowrap text-gray-500',
      render: (submission) =>
        submission.createdAt ? dayjs(submission.createdAt).format('D MMMM YYYY') : '',
    },
  ];

  return (
    <Table
      data={submissions}
      columns={columns}
      keyExtractor={(submission) => submission.id}
      emptyMessage={null}
    />
  );
}

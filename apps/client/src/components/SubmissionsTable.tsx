import { GrantSubmission } from 'graphql-server';
import { CurrencyDollarIcon } from '@heroicons/react/24/outline';

interface SubmissionsTableProps {
  submissions: GrantSubmission[];
}

export function SubmissionsTable({ submissions }: SubmissionsTableProps) {
  if (!submissions || submissions.length === 0) return null;

  return (
    <section className="mt-20">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">All Grant Opportunities</h2>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Foundation name
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Grant name
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Average amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Deadline
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Match date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {submissions.map((submission) => (
                <tr key={submission.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className=" text-gray-600">{submission.grant.providerName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="  text-gray-600">{submission.grant.grantTitle}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className=" text-gray-600 flex items-center">
                      <CurrencyDollarIcon className="h-4 w-4 mr-2" />
                      {submission.grant.amount}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${submission.state === 'APPROVED' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}
                    >
                      {submission.state}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className=" text-gray-600 line-clamp-1">
                      {submission.grant.deadline
                        ? new Date(Number(submission.grant.deadline)).toLocaleDateString()
                        : ''}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap  text-gray-600">
                    {new Date(
                      isNaN(Number(submission.createdAt))
                        ? submission.createdAt
                        : Number(submission.createdAt),
                    ).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

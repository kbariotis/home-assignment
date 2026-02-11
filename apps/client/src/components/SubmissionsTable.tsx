import dayjs from 'dayjs';
import { GrantSubmission } from 'graphql-server';

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
            <thead>
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-600 tracking-wider">
                  Foundation name
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-600 tracking-wider">
                  Grant name
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-600 tracking-wider">
                  Average amount
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-600 tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-600 tracking-wider">
                  Deadline
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-600 tracking-wider">
                  Match date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {submissions.map((submission) => (
                <tr key={submission.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className=" text-gray-500">{submission.grant.providerName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="  text-gray-500">{submission.grant.grantTitle}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className=" text-gray-500 flex items-center">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        maximumSignificantDigits: 3,
                      }).format(Number(submission.grant.amount))}
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
                    <div className=" text-gray-500 line-clamp-1">
                      {submission.grant.deadline
                        ? dayjs(submission.grant.deadline).format('MMMM Do')
                        : ''}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap  text-gray-500">
                    {submission.createdAt ? dayjs(submission.createdAt).format('D MMMM YYYY') : ''}
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

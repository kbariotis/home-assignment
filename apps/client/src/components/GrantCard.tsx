import { Grant, SubmissionState } from 'graphql-server';
import {
  CurrencyDollarIcon,
  CalendarIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
} from '@heroicons/react/24/outline';

interface GrantCardProps {
  grant: Grant;
  onApprove: (id: string, state: SubmissionState) => void;
  onReject: (id: string, state: SubmissionState) => void;
}

export function GrantCard({ grant, onApprove, onReject }: GrantCardProps) {
  return (
    <div className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300 flex flex-col h-full">
      <div className="mb-4 flex items-center justify-between">
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-100">
          {grant.providerName}
        </span>
        {grant.submission && (
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${grant.submission.state === 'APPROVED' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}
          >
            {grant.submission.state}
          </span>
        )}
      </div>

      <h3 className="text-base font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
        {grant.grantTitle}
      </h3>

      <div className="mt-auto space-y-3">
        <div className="flex items-center text-sm font-semibold text-gray-900">
          <span className="text-green-600 mr-2">
            <CurrencyDollarIcon className="h-4 w-4" />
          </span>
          {grant.amount || 'Variable'}
        </div>

        <div className="flex items-center text-[12px] text-gray-500">
          <CalendarIcon className="flex-shrink-0 mr-1.5 h-3.5 w-3.5 text-gray-400" />
          <span>
            {grant.deadline
              ? new Date(
                  isNaN(Number(grant.deadline)) ? grant.deadline : Number(grant.deadline),
                ).toLocaleDateString()
              : 'Rolling'}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-2">
          {grant.areas.slice(0, 3).map((area: string) => (
            <span
              key={area}
              className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600"
            >
              {area}
            </span>
          ))}
        </div>

        {!grant.submission && (
          <div className="flex gap-2 pt-4">
            <button
              onClick={() => onApprove(grant.id, SubmissionState.APPROVED)}
              className="flex-1 flex justify-center items-center py-2 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition-all cursor-pointer active:scale-95"
            >
              <HandThumbUpIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => onReject(grant.id, SubmissionState.REJECTED)}
              className="flex-1 flex justify-center items-center py-2 px-4 border border-gray-200 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all cursor-pointer active:scale-95"
            >
              <HandThumbDownIcon className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

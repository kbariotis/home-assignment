import { Grant, SubmissionState } from 'graphql-server';
import {
  CircleStackIcon,
  CalendarIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
} from '@heroicons/react/24/outline';
import dayjs from 'dayjs';

interface GrantCardProps {
  grant: Grant;
  onApprove: (id: string, state: SubmissionState) => void;
  onReject: (id: string, state: SubmissionState) => void;
}

function AreaLabel({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-2 py-1 rounded-xl text-[11px] font-bold bg-gray-50 text-gray-500 border border-gray-100/50">
      {label}
    </span>
  );
}

export function GrantCard({ grant, onApprove, onReject }: GrantCardProps) {
  return (
    <div className="group relative bg-white rounded-xl border-2 border-gray-200 p-4 hover:border-orange-200 transition-all duration-300 flex flex-col h-full">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
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

        {!grant.submission && (
          <div className="flex gap-1.5">
            <button
              onClick={() => onApprove(grant.id, SubmissionState.APPROVED)}
              className="flex justify-center items-center p-1.5 border border-gray-200 rounded-sm shadow-sm text-gray-400 bg-white hover:bg-green-50 hover:border-green-200 hover:text-green-600 transition-all cursor-pointer active:scale-95"
              title="Approve"
            >
              <HandThumbUpIcon className="h-4 w-4" />
            </button>
            <button
              onClick={() => onReject(grant.id, SubmissionState.REJECTED)}
              className="flex justify-center items-center p-1.5 border border-gray-200 rounded-sm shadow-sm text-gray-400 bg-white hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all cursor-pointer active:scale-95"
              title="Reject"
            >
              <HandThumbDownIcon className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <h3 className="text-base font-bold text-gray-900 mb-4 line-clamp-2 leading-tight">
        {grant.grantTitle}
      </h3>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-orange-50/50 rounded-2xl p-3 flex flex-col justify-between aspect-square">
          <CircleStackIcon className="h-5 w-5 text-orange-400" />
          <div>
            <div className="text-xl font-black text-orange-600 leading-none">
              {grant.amount && !isNaN(Number(grant.amount))
                ? new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    maximumFractionDigits: 0,
                  }).format(Number(grant.amount))
                : grant.amount || 'Variable'}
            </div>
            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1.5">
              Avg Amount
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-3 flex flex-col justify-between aspect-square border border-gray-100/50">
          <CalendarIcon className="h-5 w-5 text-gray-400" />
          <div>
            <div className="text-lg font-bold text-gray-900 leading-none">
              {grant.deadline ? dayjs(grant.deadline).format('MMMM Do') : 'Rolling'}
            </div>
            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1.5">
              Deadline
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 mt-auto">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400 font-medium">Location</span>
          <span className="text-sm font-bold text-gray-500">{grant.location || 'Nationwide'}</span>
        </div>

        <div className="space-y-2.5">
          <div className="text-sm text-gray-400 font-medium">Area of Funding</div>
          <div className="flex flex-wrap gap-1.5">
            {grant.areas.slice(0, 4).map((area: string) => (
              <AreaLabel key={area} label={area} />
            ))}
            {grant.areas.length > 4 && <AreaLabel label={`+${grant.areas.length - 4}`} />}
          </div>
        </div>
      </div>
    </div>
  );
}

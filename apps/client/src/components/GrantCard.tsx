import { Grant, SubmissionState } from 'graphql-server';

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
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${grant.submission.state === 'APPROVED' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
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
             <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          {grant.amount || 'Variable'}
        </div>

        <div className="flex items-center text-[12px] text-gray-500">
          <svg className="flex-shrink-0 mr-1.5 h-3.5 w-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{grant.deadline ? new Date(isNaN(Number(grant.deadline)) ? grant.deadline : Number(grant.deadline)).toLocaleDateString() : 'Rolling'}</span>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-2">
          {grant.areas.slice(0, 3).map((area: string) => (
            <span key={area} className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600">
              {area}
            </span>
          ))}
        </div>

        {!grant.submission && (
          <div className="flex gap-2 pt-4">
            <button 
              onClick={() => onApprove(grant.id, SubmissionState.APPROVED)}
              className="flex-1 flex justify-center items-center py-2 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition-colors"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.708c.214 0 .39.155.43.362l.667 3.333a.46.46 0 01-.43.585H14m0-4.28V5a2 2 0 00-2-2H8a2 2 0 00-2 2v10m2 0h1a2 2 0 002 2h2a2 2 0 002-2M9 10H5V9a3 3 0 013-3h1m0 4V9" />
              </svg>
            </button>
            <button 
              onClick={() => onReject(grant.id, SubmissionState.REJECTED)}
              className="flex-1 flex justify-center items-center py-2 px-4 border border-gray-200 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14H5.292a.46.46 0 01-.43-.585l.667-3.333a.44.44 0 01.43-.362H10m0 4.28V19a2 2 0 002 2h4a2 2 0 002-2v-10m-2 0h-1a2 2 0 01-2-2V5a3 3 0 00-3-3h-1m0 4v1" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

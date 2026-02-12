export function GrantCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-4 flex flex-col h-full animate-pulse">
      <div className="mb-4 flex items-center justify-between">
        <div className="h-6 w-24 bg-gray-200 rounded-full" />
      </div>

      <div className="h-6 w-3/4 bg-gray-200 rounded mb-2" />
      <div className="h-6 w-1/2 bg-gray-200 rounded mb-6" />

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-gray-50 rounded-2xl p-3 flex flex-col justify-between aspect-square">
          <div className="h-5 w-5 bg-gray-200 rounded-full" />
          <div>
            <div className="h-8 w-16 bg-gray-200 rounded mb-2" />
            <div className="h-3 w-20 bg-gray-200 rounded" />
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-3 flex flex-col justify-between aspect-square border border-gray-100/50">
          <div className="h-5 w-5 bg-gray-200 rounded-full" />
          <div>
            <div className="h-8 w-24 bg-gray-200 rounded mb-2" />
            <div className="h-3 w-16 bg-gray-200 rounded" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 mt-auto">
        <div className="flex justify-between items-center">
          <div className="h-4 w-16 bg-gray-200 rounded" />
          <div className="h-4 w-24 bg-gray-200 rounded" />
        </div>

        <div className="space-y-2.5">
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="flex flex-wrap gap-1.5">
            <div className="h-6 w-16 bg-gray-200 rounded-xl" />
            <div className="h-6 w-20 bg-gray-200 rounded-xl" />
            <div className="h-6 w-14 bg-gray-200 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

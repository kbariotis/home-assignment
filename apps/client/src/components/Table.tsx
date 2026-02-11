import React from 'react';

export interface Column<T> {
  header: string;
  render: (item: T) => React.ReactNode;
  className?: string;
  headerClassName?: string;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string | number;
  onRowClick?: (item: T) => void;
  className?: string;
  emptyMessage?: string | null;
}

export function Table<T>({
  data,
  columns,
  keyExtractor,
  onRowClick,
  className = '',
  emptyMessage,
}: TableProps<T>) {
  if (!data || data.length === 0) {
    if (emptyMessage === null) return null;
    return (
      <div className="text-center py-10 text-gray-500 bg-white rounded-2xl border border-gray-100">
        {emptyMessage || 'No data available'}
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden ${className}`}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`px-6 py-4 text-left text-sm font-bold text-gray-600 tracking-wider ${column.headerClassName || ''}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item) => (
              <tr
                key={keyExtractor(item)}
                onClick={() => onRowClick?.(item)}
                className={`transition-colors ${onRowClick ? 'cursor-pointer hover:bg-gray-50' : 'hover:bg-gray-50'}`}
              >
                {columns.map((column, index) => (
                  <td key={index} className={`px-6 py-4 ${column.className || ''}`}>
                    {column.render(item)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

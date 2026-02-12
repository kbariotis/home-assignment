import React from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/20/solid';

export interface Column<T> {
  header: string;
  render: (item: T) => React.ReactNode;
  className?: string;
  headerClassName?: string;
  sortKey?: string;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string | number;
  onRowClick?: (item: T) => void;
  onSort?: (sortKey: string) => void;
  currentSortKey?: string;
  currentSortDirection?: 'ASC' | 'DESC';
  className?: string;
  emptyMessage?: string | null;
}

/**
 * General purpose Table component. Supports
 * sorting.
 */
export function Table<T>({
  data,
  columns,
  keyExtractor,
  onRowClick,
  onSort,
  currentSortKey,
  currentSortDirection,
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
              {columns.map((column, index) => {
                const isSortable = !!column.sortKey;
                const isActive = currentSortKey === column.sortKey;

                return (
                  <th
                    key={index}
                    onClick={() => isSortable && onSort?.(column.sortKey!)}
                    className={`px-6 py-4 text-left text-sm font-bold text-gray-600 tracking-wider ${
                      isSortable ? 'cursor-pointer select-none hover:bg-gray-50' : ''
                    } ${column.headerClassName || ''}`}
                  >
                    <div className="flex items-center gap-2 group/header">
                      {column.header}
                      {isSortable && (
                        <div className="flex flex-col ml-1 space-y-0">
                          <ChevronUpIcon
                            className={`w-3 h-3 transition-colors ${
                              isActive && currentSortDirection === 'ASC'
                                ? 'text-orange-500'
                                : 'text-gray-400 group-hover/header:text-orange-400'
                            }`}
                          />
                          <ChevronDownIcon
                            className={`w-3 h-3 transition-colors ${
                              isActive && currentSortDirection === 'DESC'
                                ? 'text-orange-500'
                                : 'text-gray-400 group-hover/header:text-orange-400'
                            }`}
                          />
                        </div>
                      )}
                    </div>
                  </th>
                );
              })}
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

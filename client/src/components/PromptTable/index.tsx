import React from 'react';
import { TableCell } from './TableCell';
import { ColumnOptions } from './ColumnOptions';
import { Column, PromptRow } from '@/data/initialData';

interface PromptTableProps {
  columns: Column[];
  rows: PromptRow[];
  selectedCell: { rowId: string, columnId: string } | null;
  onCellSelect: (rowId: string, columnId: string) => void;
  onCellChange: (rowId: string, columnId: string, value: string | string[]) => void;
  onAddColumnOption: (columnId: string, option: string) => void;
}

export const PromptTable: React.FC<PromptTableProps> = ({
  columns,
  rows,
  selectedCell,
  onCellSelect,
  onCellChange,
  onAddColumnOption
}) => {
  return (
    <div className="border border-slate-200 dark:border-gray-750 rounded-lg overflow-hidden mb-6">
      <div className="table-wrapper overflow-x-auto">
        <table className="w-full border-collapse min-w-[1000px]">
          <thead className="bg-slate-100 dark:bg-gray-800 sticky top-0 z-10">
            <tr>
              <th className="p-0 border-b border-r border-slate-200 dark:border-gray-750 w-10">
                <div className="p-2 text-left font-medium text-slate-700 dark:text-slate-300 flex justify-center items-center">
                  #
                </div>
              </th>
              
              {columns.map((column) => (
                <th key={column.id} className="p-0 border-b border-r border-slate-200 dark:border-gray-750 min-w-[150px]">
                  <div className="p-2 text-left font-medium text-slate-700 dark:text-slate-300 flex justify-between items-center">
                    <span>{column.name}</span>
                    <ColumnOptions 
                      column={column}
                      onAddOption={onAddColumnOption}
                    />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} data-row-id={row.id} className="group/row">
                <td className="p-0 border-b border-r border-slate-200 dark:border-gray-750 bg-slate-50 dark:bg-gray-850 text-center">
                  <div className="table-cell-content p-2 text-sm text-slate-500 dark:text-slate-400">
                    {row.id}
                  </div>
                </td>
                
                {columns.map((column) => {
                  const cell = row.cells.find(c => c.columnId === column.id);
                  if (!cell) return null;
                  
                  const isSelected = 
                    selectedCell?.rowId === row.id && 
                    selectedCell?.columnId === column.id;
                  
                  return (
                    <TableCell 
                      key={`${row.id}-${column.id}`}
                      column={column}
                      cell={cell}
                      isSelected={isSelected}
                      onCellClick={() => onCellSelect(row.id, column.id)}
                      onCellChange={(value) => onCellChange(row.id, column.id, value)}
                      onAddOption={(option) => onAddColumnOption(column.id, option)}
                    />
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

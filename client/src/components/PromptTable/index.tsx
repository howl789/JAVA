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
    <div className="border border-[#c8bfa9] dark:border-[#2a2a2a] rounded-lg overflow-hidden mb-6 shadow-sm">
      <div className="table-wrapper overflow-x-auto">
        <table className="w-full border-collapse min-w-[1000px]">
          <thead className="bg-[#e6dfd1] dark:bg-[#1a1a1a] sticky top-0 z-10">
            <tr>
              <th className="p-0 border-b border-r border-[#c8bfa9] dark:border-[#2a2a2a] w-10">
                <div className="p-2 text-left font-medium text-[#121212] dark:text-[#e6dfd1] flex justify-center items-center">
                  #
                </div>
              </th>
              
              {columns.map((column) => (
                <th key={column.id} className="p-0 border-b border-r border-[#c8bfa9] dark:border-[#2a2a2a] min-w-[150px]">
                  <div className="p-2 text-left font-medium text-[#121212] dark:text-[#e6dfd1] flex justify-between items-center">
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
              <tr key={row.id} data-row-id={row.id} className="group/row hover:bg-[#f5f3ed] dark:hover:bg-[#1f1f1f]">
                <td className="p-0 border-b border-r border-[#c8bfa9] dark:border-[#2a2a2a] bg-[#f5f3ed] dark:bg-[#121212] text-center">
                  <div className="table-cell-content p-2 text-sm text-[#121212] dark:text-[#e6dfd1]">
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

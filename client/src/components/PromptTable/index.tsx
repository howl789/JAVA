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
    <div className="border border-[#CC7351] dark:border-[#CC7351] rounded-lg overflow-hidden mb-6 shadow-sm">
      <div className="table-wrapper overflow-x-auto">
        <table className="w-full border-collapse min-w-[1000px]">
          <thead className="bg-[#F5F0E6] dark:bg-[#264653] sticky top-0 z-10">
            <tr>
              <th className="p-0 border-b border-r border-[#CC7351] dark:border-[#CC7351] w-10">
                <div className="p-2 text-left font-medium heading-text flex justify-center items-center">
                  #
                </div>
              </th>
              
              {columns.map((column) => (
                <th key={column.id} className="p-0 border-b border-r border-[#CC7351] dark:border-[#CC7351] min-w-[150px]">
                  <div className="p-2 text-left font-medium heading-text flex justify-between items-center">
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
              <tr key={row.id} data-row-id={row.id} className="group/row hover:bg-[#F5F0E6] dark:hover:bg-[#1e3a45]">
                <td className="p-0 border-b border-r border-[#CC7351] dark:border-[#CC7351] bg-[#F5F0E6] dark:bg-[#1e3a45] text-center">
                  <div className="table-cell-content p-2 text-sm body-text">
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

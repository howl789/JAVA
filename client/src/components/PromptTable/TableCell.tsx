import React from 'react';
import { Dropdown } from '@/components/DataEntry/Dropdown';
import { MultiSelect } from '@/components/DataEntry/MultiSelect';
import { Column, Cell } from '@/data/initialData';

interface TableCellProps {
  column: Column;
  cell: Cell;
  isSelected: boolean;
  onCellClick: () => void;
  onCellChange: (value: string | string[]) => void;
  onAddOption?: (option: string) => void;
}

export const TableCell: React.FC<TableCellProps> = ({
  column,
  cell,
  isSelected,
  onCellClick,
  onCellChange,
  onAddOption
}) => {
  return (
    <td 
      className={`p-0 border-b border-r border-[#c8bfa9] dark:border-[#2a2a2a] ${isSelected ? 'cursor-cell' : ''} ${isSelected ? 'bg-[#fdf8ea] dark:bg-[#1f1f1f]' : ''}`}
      onClick={onCellClick}
    >
      <div className="table-cell-content relative p-1">
        {column.type === 'dropdown' && (
          <Dropdown
            options={column.options}
            value={cell.value as string}
            onChange={onCellChange}
            onAddOption={onAddOption}
            placeholder={`Select ${column.name.toLowerCase()}`}
          />
        )}
        
        {column.type === 'multiselect' && (
          <MultiSelect
            options={column.options}
            value={cell.value as string[]}
            onChange={onCellChange}
            onAddOption={onAddOption}
            tagColorClass={column.id === 'negativePrompts' ? "bg-[#ffcccc] text-[#600000] dark:bg-[#3a1a1a] dark:text-[#ffcccc]" : "bg-[#e6dfd1] text-[#121212] dark:bg-[#2a2a2a] dark:text-[#e6dfd1]"}
            negativeTag={column.id === 'negativePrompts'}
          />
        )}
      </div>
    </td>
  );
};

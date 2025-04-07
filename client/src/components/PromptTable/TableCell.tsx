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
      className={`p-0 border-b border-r border-[#CC7351] dark:border-[#CC7351] ${isSelected ? 'cursor-cell' : ''} ${isSelected ? 'bg-white dark:bg-[#213f4a]' : ''}`}
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
            tagColorClass={column.id === 'negativePrompts' ? "bg-[#ffded9] text-[#8B0000] dark:bg-[#3a1a1a] dark:text-[#ffded9]" : "bg-[#F5F0E6] text-[#8B7355] dark:bg-[#1e3a45] dark:text-[#F5F0E6]"}
            negativeTag={column.id === 'negativePrompts'}
          />
        )}
      </div>
    </td>
  );
};

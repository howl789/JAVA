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
      className={`p-0 border-b border-r border-slate-200 dark:border-gray-750 ${isSelected ? 'cursor-cell' : ''}`}
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
            negativeTag={column.id === 'negativePrompts'}
          />
        )}
      </div>
    </td>
  );
};

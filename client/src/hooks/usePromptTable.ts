import { useState, useCallback } from 'react';
import { PromptRow, Column, columns as initialColumns, initialRows, Cell } from '@/data/initialData';

export function usePromptTable() {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [rows, setRows] = useState<PromptRow[]>(initialRows);
  const [selectedCell, setSelectedCell] = useState<{ rowId: string, columnId: string } | null>(null);
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [activeAiModel, setActiveAiModel] = useState<string>('midjourney');

  // Add a new row
  const addRow = useCallback(() => {
    const newRowId = (rows.length + 1).toString();
    const newRow: PromptRow = {
      id: newRowId,
      cells: columns.map(column => ({
        columnId: column.id,
        value: column.type === 'dropdown' ? '' : []
      }))
    };
    setRows(prevRows => [...prevRows, newRow]);
  }, [columns, rows.length]);

  // Delete a row
  const deleteRow = useCallback((rowId: string) => {
    setRows(prevRows => prevRows.filter(row => row.id !== rowId));
    if (selectedRow === rowId) {
      setSelectedRow(null);
    }
  }, [selectedRow]);

  // Update a cell value
  const updateCell = useCallback((rowId: string, columnId: string, value: string | string[]) => {
    setRows(prevRows => 
      prevRows.map(row => 
        row.id === rowId
          ? {
              ...row,
              cells: row.cells.map(cell => 
                cell.columnId === columnId
                  ? { ...cell, value }
                  : cell
              )
            }
          : row
      )
    );
  }, []);

  // Add a new option to a column
  const addColumnOption = useCallback((columnId: string, option: string) => {
    setColumns(prevColumns => 
      prevColumns.map(column => 
        column.id === columnId
          ? { ...column, options: [...column.options, option] }
          : column
      )
    );
  }, []);

  // Get a cell by rowId and columnId
  const getCell = useCallback((rowId: string, columnId: string): Cell | undefined => {
    const row = rows.find(r => r.id === rowId);
    if (!row) return undefined;
    return row.cells.find(cell => cell.columnId === columnId);
  }, [rows]);

  // Apply a theme preset
  const applyThemePreset = useCallback((settings: Record<string, any>) => {
    setRows(prevRows => 
      prevRows.map(row => {
        if (row.id === selectedRow || !selectedRow) {
          const updatedCells = row.cells.map(cell => {
            if (settings[cell.columnId] !== undefined) {
              return { ...cell, value: settings[cell.columnId] };
            }
            return cell;
          });
          return { ...row, cells: updatedCells };
        }
        return row;
      })
    );
  }, [selectedRow]);

  // Clear all rows
  const clearAllRows = useCallback(() => {
    setRows([]);
    setSelectedRow(null);
    setSelectedCell(null);
  }, []);

  return {
    columns,
    rows,
    selectedCell,
    setSelectedCell,
    selectedRow,
    setSelectedRow,
    activeAiModel,
    setActiveAiModel,
    addRow,
    deleteRow,
    updateCell,
    addColumnOption,
    getCell,
    applyThemePreset,
    clearAllRows,
  };
}

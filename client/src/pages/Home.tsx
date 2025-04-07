import React, { useState } from 'react';
import { usePromptTable } from '@/hooks/usePromptTable';
import { PromptTable } from '@/components/PromptTable';
import { PromptPreview } from '@/components/PromptPreview';
import { ExportOptions } from '@/components/ExportOptions';
import { ThemeToggle } from '@/components/ThemeToggle';
import { 
  PlusCircle, 
  Trash2, 
  Download, 
  Upload, 
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { aiModels } from '@/data/initialData';
import { useToast } from '@/hooks/use-toast';

const Home: React.FC = () => {
  const {
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
    applyThemePreset
  } = usePromptTable();

  const { toast } = useToast();
  
  // Handle cell selection
  const handleCellSelect = (rowId: string, columnId: string) => {
    setSelectedCell({ rowId, columnId });
    setSelectedRow(rowId);
  };
  
  // Get the selected row for preview
  const selectedRowData = rows.find(row => row.id === selectedRow) || (rows.length > 0 ? rows[0] : null);
  
  // Handle row deletion
  const handleDeleteRow = () => {
    if (selectedRow) {
      deleteRow(selectedRow);
      toast({
        title: "Row deleted",
        description: `Prompt row #${selectedRow} has been deleted.`
      });
    } else {
      toast({
        title: "No row selected",
        description: "Please select a row to delete.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <header className="mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            Anime Prompt Table Generator
          </h1>
          <div className="flex items-center space-x-3 mt-3 md:mt-0">
            <ThemeToggle />
            <Button className="px-3 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              <span>Settings</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-2">
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={addRow}
                variant="outline"
                className="px-3 py-2 bg-slate-200 dark:bg-gray-750 rounded-md hover:bg-slate-300 dark:hover:bg-gray-700 transition-colors flex items-center"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                <span>Add Row</span>
              </Button>
              
              <Button
                onClick={handleDeleteRow}
                variant="outline"
                className="px-3 py-2 bg-slate-200 dark:bg-gray-750 rounded-md hover:bg-slate-300 dark:hover:bg-gray-700 transition-colors flex items-center"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                <span>Delete Row</span>
              </Button>
              
              <Button
                onClick={() => toast({
                  title: "Export",
                  description: "Please use the export options section below."
                })}
                variant="outline"
                className="px-3 py-2 bg-slate-200 dark:bg-gray-750 rounded-md hover:bg-slate-300 dark:hover:bg-gray-700 transition-colors flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                <span>Export</span>
              </Button>
              
              <Button
                onClick={() => toast({
                  title: "Import feature",
                  description: "Import functionality will be added in a future update."
                })}
                variant="outline"
                className="px-3 py-2 bg-slate-200 dark:bg-gray-750 rounded-md hover:bg-slate-300 dark:hover:bg-gray-700 transition-colors flex items-center"
              >
                <Upload className="h-4 w-4 mr-2" />
                <span>Import</span>
              </Button>
            </div>
          </div>
          
          <div className="col-span-1">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-500 dark:text-slate-400">AI Model:</span>
              <Select value={activeAiModel} onValueChange={setActiveAiModel}>
                <SelectTrigger className="bg-slate-200 dark:bg-gray-750 rounded-md border-0 focus:ring-2 focus:ring-primary-500 outline-none">
                  <SelectValue placeholder="Select AI Model" />
                </SelectTrigger>
                <SelectContent>
                  {aiModels.map(model => (
                    <SelectItem key={model.id} value={model.id}>
                      {model.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      {/* Spreadsheet Interface */}
      <PromptTable
        columns={columns}
        rows={rows}
        selectedCell={selectedCell}
        onCellSelect={handleCellSelect}
        onCellChange={updateCell}
        onAddColumnOption={addColumnOption}
      />

      {/* Prompt Preview */}
      <PromptPreview 
        row={selectedRowData}
        aiModel={activeAiModel}
      />

      {/* Export Options */}
      <ExportOptions 
        rows={rows}
        activeAiModel={activeAiModel}
        onApplyThemePreset={applyThemePreset}
      />
    </div>
  );
};

export default Home;

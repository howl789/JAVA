import React, { useState } from 'react';
import { 
  RadioGroup, 
  RadioGroupItem 
} from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { exportFormats, aiModels, themePresets } from '@/data/initialData';
import { exportData } from '@/lib/exportUtils';
import { useToast } from '@/hooks/use-toast';

interface ExportOptionsProps {
  rows: any[];
  activeAiModel: string;
  onApplyThemePreset: (settings: Record<string, any>) => void;
}

export const ExportOptions: React.FC<ExportOptionsProps> = ({
  rows,
  activeAiModel,
  onApplyThemePreset
}) => {
  const { toast } = useToast();
  const [selectedFormat, setSelectedFormat] = useState(exportFormats[0].id);
  const [selectedModels, setSelectedModels] = useState<Record<string, boolean>>({
    midjourney: true,
    dalle: false,
    leonardo: false
  });

  const handleExport = () => {
    if (rows.length === 0) {
      toast({
        title: "Nothing to export",
        description: "Please create at least one prompt row before exporting.",
        variant: "destructive"
      });
      return;
    }

    const format = exportFormats.find(f => f.id === selectedFormat);
    if (format) {
      exportData(rows, format, activeAiModel);
      toast({
        title: "Export successful",
        description: `Your prompts have been exported as ${format.name}.`
      });
    }
  };

  const handleModelToggle = (modelId: string, checked: boolean) => {
    setSelectedModels(prev => ({
      ...prev,
      [modelId]: checked
    }));
  };

  const handlePresetClick = (preset: any) => {
    onApplyThemePreset(preset.settings);
    toast({
      title: "Theme preset applied",
      description: `Applied "${preset.name}" theme to the selected row.`
    });
  };

  return (
    <div className="flex flex-wrap gap-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex-1 min-w-[250px]">
        <h3 className="font-medium mb-3 text-slate-700 dark:text-slate-300">Export Format</h3>
        <RadioGroup value={selectedFormat} onValueChange={setSelectedFormat}>
          {exportFormats.map(format => (
            <div className="flex items-center space-x-2 py-1" key={format.id}>
              <RadioGroupItem value={format.id} id={`format-${format.id}`} />
              <Label htmlFor={`format-${format.id}`}>{format.name}</Label>
            </div>
          ))}
        </RadioGroup>
        <Button onClick={handleExport} className="w-full mt-4">
          Export
        </Button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex-1 min-w-[250px]">
        <h3 className="font-medium mb-3 text-slate-700 dark:text-slate-300">AI Tool Formatting</h3>
        <div className="flex flex-col space-y-2">
          {aiModels.map(model => (
            <div className="flex items-center space-x-2" key={model.id}>
              <Checkbox 
                id={`model-${model.id}`} 
                checked={selectedModels[model.id]} 
                onCheckedChange={(checked) => handleModelToggle(model.id, checked as boolean)}
              />
              <Label htmlFor={`model-${model.id}`}>
                {model.name}{model.formatString ? ` (${model.formatString})` : ''}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex-1 min-w-[250px]">
        <h3 className="font-medium mb-3 text-slate-700 dark:text-slate-300">Theme Presets</h3>
        <div className="grid grid-cols-2 gap-2">
          {themePresets.map((preset, index) => (
            <Button 
              key={index} 
              variant="outline" 
              className="p-2 bg-slate-100 dark:bg-gray-750 rounded hover:bg-slate-200 dark:hover:bg-gray-700 text-left text-sm justify-start font-normal"
              onClick={() => handlePresetClick(preset)}
            >
              {preset.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

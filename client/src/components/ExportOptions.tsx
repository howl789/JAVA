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
      <div className="bg-[#f5f3ed] dark:bg-[#1a1a1a] rounded-lg shadow-sm p-4 flex-1 min-w-[250px]">
        <h3 className="font-medium mb-3 text-[#121212] dark:text-[#e6dfd1]">Export Format</h3>
        <RadioGroup value={selectedFormat} onValueChange={setSelectedFormat}>
          {exportFormats.map(format => (
            <div className="flex items-center space-x-2 py-1" key={format.id}>
              <RadioGroupItem value={format.id} id={`format-${format.id}`} className="border-[#ff6b6b] text-[#ff6b6b]" />
              <Label htmlFor={`format-${format.id}`} className="text-[#121212] dark:text-[#e6dfd1]">{format.name}</Label>
            </div>
          ))}
        </RadioGroup>
        <Button onClick={handleExport} className="w-full mt-4 bg-[#ff6b6b] hover:bg-[#ff8787] text-white">
          Export
        </Button>
      </div>
      
      <div className="bg-[#f5f3ed] dark:bg-[#1a1a1a] rounded-lg shadow-sm p-4 flex-1 min-w-[250px]">
        <h3 className="font-medium mb-3 text-[#121212] dark:text-[#e6dfd1]">AI Tool Formatting</h3>
        <div className="flex flex-col space-y-2">
          {aiModels.map(model => (
            <div className="flex items-center space-x-2" key={model.id}>
              <Checkbox 
                id={`model-${model.id}`} 
                checked={selectedModels[model.id]} 
                onCheckedChange={(checked) => handleModelToggle(model.id, checked as boolean)}
                className="border-[#c8bfa9] data-[state=checked]:bg-[#ff6b6b] data-[state=checked]:text-white"
              />
              <Label htmlFor={`model-${model.id}`} className="text-[#121212] dark:text-[#e6dfd1]">
                {model.name}{model.formatString ? ` (${model.formatString})` : ''}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-[#f5f3ed] dark:bg-[#1a1a1a] rounded-lg shadow-sm p-4 flex-1 min-w-[250px]">
        <h3 className="font-medium mb-3 text-[#121212] dark:text-[#e6dfd1]">Anime Theme Preset</h3>
        <div className="flex justify-center">
          {themePresets.map((preset, index) => (
            <Button 
              key={index}
              className="p-3 w-full bg-[#ff6b6b] hover:bg-[#ff8787] text-white rounded-md transition-colors flex items-center justify-center font-medium"
              onClick={() => handlePresetClick(preset)}
            >
              <span className="mr-2">✨</span>
              {preset.name}
              <span className="ml-2">✨</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

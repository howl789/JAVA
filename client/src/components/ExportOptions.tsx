import React, { useState } from 'react';
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
  const [selectedModels, setSelectedModels] = useState<Record<string, boolean>>({
    midjourney: true,
    dalle: false,
    leonardo: false,
    other: false
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

    // Default to CSV format
    const format = exportFormats[0];
    exportData(rows, format, activeAiModel);
    toast({
      title: "Export successful",
      description: `Your prompts have been exported as ${format.name}.`
    });
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
      <div className="bg-[#F5F0E6] dark:bg-[#264653] rounded-lg shadow-sm p-4 flex-1 min-w-[250px] border border-[#CC7351] dark:border-[#CC7351]">
        <h3 className="font-medium mb-3 heading-text">AI Tool Formatting</h3>
        <div className="flex flex-col space-y-2">
          {aiModels.map(model => (
            <div className="flex items-center space-x-2" key={model.id}>
              <Checkbox 
                id={`model-${model.id}`} 
                checked={selectedModels[model.id]} 
                onCheckedChange={(checked) => handleModelToggle(model.id, checked as boolean)}
                className="border-[#CC7351] data-[state=checked]:bg-[#CC7351] data-[state=checked]:text-white"
              />
              <Label htmlFor={`model-${model.id}`} className="body-text">
                {model.name}{model.formatString ? ` (${model.formatString})` : ''}
              </Label>
            </div>
          ))}
          
          {/* Other option */}
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="model-other" 
              checked={selectedModels.other} 
              onCheckedChange={(checked) => handleModelToggle('other', checked as boolean)}
              className="border-[#CC7351] data-[state=checked]:bg-[#CC7351] data-[state=checked]:text-white"
            />
            <Label htmlFor="model-other" className="body-text">
              Other
            </Label>
          </div>
        </div>
        
        <Button onClick={handleExport} className="w-full mt-4 primary-button">
          Export
        </Button>
      </div>
      
      <div className="bg-[#F5F0E6] dark:bg-[#264653] rounded-lg shadow-sm p-4 flex-1 min-w-[250px] border border-[#CC7351] dark:border-[#CC7351]">
        <h3 className="font-medium mb-3 heading-text">Anime Theme Preset</h3>
        <div className="flex justify-center">
          {themePresets.map((preset, index) => (
            <Button 
              key={index}
              className="p-3 w-full primary-button rounded-md flex items-center justify-center font-medium"
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

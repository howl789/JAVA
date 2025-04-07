import React, { useState } from 'react';
import { Check, Clipboard } from 'lucide-react';
import { PromptRow } from '@/data/initialData';
import { formatRowPrompt } from '@/lib/promptUtils';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface PromptPreviewProps {
  row: PromptRow | null;
  aiModel: string;
}

export const PromptPreview: React.FC<PromptPreviewProps> = ({ row, aiModel }) => {
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();
  
  const promptText = row ? formatRowPrompt(row, aiModel) : 'Select a row to preview prompt';
  
  const handleCopy = () => {
    if (!row) return;
    
    navigator.clipboard.writeText(promptText)
      .then(() => {
        setIsCopied(true);
        toast({
          title: "Copied to clipboard",
          description: "Prompt has been copied to your clipboard.",
          duration: 2000
        });
        
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch(err => {
        toast({
          title: "Failed to copy",
          description: "Could not copy to clipboard: " + err.message,
          variant: "destructive"
        });
      });
  };
  
  return (
    <div className="bg-slate-100 dark:bg-gray-850 rounded-lg p-4 mb-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-lg">Prompt Preview</h2>
        <div className="flex space-x-2">
          <Button 
            onClick={handleCopy}
            disabled={!row}
            className="px-3 py-1 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors flex items-center text-sm"
          >
            {isCopied ? (
              <>
                <Check className="h-4 w-4 mr-1" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Clipboard className="h-4 w-4 mr-1" />
                <span>Copy</span>
              </>
            )}
          </Button>
        </div>
      </div>
      <div className="font-mono text-sm bg-white dark:bg-gray-800 p-3 rounded border border-slate-200 dark:border-gray-700 whitespace-pre-wrap break-all">
        {promptText}
      </div>
    </div>
  );
};

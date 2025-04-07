import React, { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Column } from '@/data/initialData';

interface ColumnOptionsProps {
  column: Column;
  onAddOption: (columnId: string, option: string) => void;
}

export const ColumnOptions: React.FC<ColumnOptionsProps> = ({
  column,
  onAddOption
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newOption, setNewOption] = useState('');

  const handleAddOption = () => {
    if (newOption.trim()) {
      onAddOption(column.id, newOption.trim());
      setNewOption('');
      setIsDialogOpen(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="text-[#121212] hover:text-[#ff6b6b] dark:text-[#e6dfd1] dark:hover:text-[#ff6b6b]">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
            Add Option
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md bg-[#f5f3ed] dark:bg-[#1a1a1a] text-[#121212] dark:text-[#e6dfd1] border-[#c8bfa9] dark:border-[#2a2a2a]">
          <DialogHeader>
            <DialogTitle className="text-[#121212] dark:text-[#e6dfd1]">Add option to {column.name}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
              placeholder="Enter new option"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddOption();
              }}
              className="bg-white dark:bg-[#121212] border-[#c8bfa9] dark:border-[#2a2a2a] text-[#121212] dark:text-[#e6dfd1]"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-[#c8bfa9] dark:border-[#2a2a2a] text-[#121212] dark:text-[#e6dfd1]">
              Cancel
            </Button>
            <Button onClick={handleAddOption} className="bg-[#ff6b6b] hover:bg-[#ff8787] text-white">
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

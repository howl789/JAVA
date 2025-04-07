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
          <button className="text-[#333333] hover:text-[#D4A017] dark:text-[#F5F0E6] dark:hover:text-[#D4A017]">
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
        <DialogContent className="sm:max-w-md bg-[#F5F0E6] dark:bg-[#264653] body-text border-[#CC7351] dark:border-[#CC7351]">
          <DialogHeader>
            <DialogTitle className="heading-text">Add option to {column.name}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
              placeholder="Enter new option"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddOption();
              }}
              className="bg-white dark:bg-[#1e3a45] border-[#CC7351] dark:border-[#CC7351] body-text"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="secondary-button">
              Cancel
            </Button>
            <Button onClick={handleAddOption} className="primary-button">
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

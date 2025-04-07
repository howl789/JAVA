import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface DropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  onAddOption?: (option: string) => void;
  placeholder?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  onAddOption,
  placeholder = 'Select option'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newOption, setNewOption] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsAddingNew(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  const handleAddOption = () => {
    if (newOption.trim() && onAddOption) {
      onAddOption(newOption.trim());
      onChange(newOption.trim());
      setNewOption('');
      setIsAddingNew(false);
      setIsOpen(false);
    }
  };

  return (
    <div className="dropdown w-full relative" ref={dropdownRef}>
      <button
        className="w-full text-left p-1 rounded hover:bg-slate-100 dark:hover:bg-gray-750 flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <span className="truncate">{value || placeholder}</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="dropdown-menu absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {options.map((option, index) => (
            <div
              key={index}
              className="p-2 hover:bg-slate-100 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}

          {onAddOption && (
            <>
              {isAddingNew ? (
                <div className="p-2 border-t border-slate-200 dark:border-gray-700">
                  <div className="flex">
                    <Input
                      type="text"
                      placeholder="New option"
                      value={newOption}
                      onChange={(e) => setNewOption(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleAddOption();
                        if (e.key === 'Escape') {
                          setIsAddingNew(false);
                          setNewOption('');
                        }
                      }}
                      className="flex-1 h-8 text-sm"
                      autoFocus
                    />
                    <Button 
                      size="sm" 
                      className="ml-1 h-8"
                      onClick={handleAddOption}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  className="p-2 text-primary-600 dark:text-primary-400 hover:bg-slate-100 dark:hover:bg-gray-700 cursor-pointer flex items-center border-t border-slate-200 dark:border-gray-700"
                  onClick={() => setIsAddingNew(true)}
                >
                  <Plus className="h-4 w-4 mr-1" /> Add new option
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

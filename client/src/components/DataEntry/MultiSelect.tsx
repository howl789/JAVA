import React, { useState, useRef, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface MultiSelectProps {
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  onAddOption?: (option: string) => void;
  tagColorClass?: string;
  negativeTag?: boolean;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  value,
  onChange,
  onAddOption,
  tagColorClass = "bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300",
  negativeTag = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newOption, setNewOption] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // If negativeTag, use red styling instead
  const actualTagClass = negativeTag
    ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    : tagColorClass;

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
    if (!value.includes(option)) {
      onChange([...value, option]);
    }
    setIsOpen(false);
  };

  const handleRemove = (option: string) => {
    onChange(value.filter(item => item !== option));
  };

  const handleAddOption = () => {
    if (newOption.trim() && onAddOption) {
      onAddOption(newOption.trim());
      onChange([...value, newOption.trim()]);
      setNewOption('');
      setIsAddingNew(false);
      setIsOpen(false);
    }
  };

  const handleOpenDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="flex flex-wrap min-h-[36px] items-center">
        {value.map((item, index) => (
          <div key={index} className={`tag ${actualTagClass} flex items-center m-1 text-xs rounded-md`}>
            {item} 
            <button 
              onClick={() => handleRemove(item)} 
              className="ml-1 hover:text-red-600 dark:hover:text-red-400"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
        <button 
          className="text-sm text-[#ff6b6b] hover:underline p-1"
          onClick={handleOpenDropdown}
        >
          + Add
        </button>
      </div>

      {isOpen && (
        <div className="dropdown-menu absolute z-50 w-full mt-1 bg-white dark:bg-[#121212] border border-[#c8bfa9] dark:border-[#2a2a2a] rounded-md shadow-lg max-h-60 overflow-y-auto">
          {options
            .filter(option => !value.includes(option))
            .map((option, index) => (
              <div
                key={index}
                className="p-2 hover:bg-[#f5f3ed] dark:hover:bg-[#1f1f1f] cursor-pointer text-[#121212] dark:text-[#e6dfd1]"
                onClick={() => handleSelect(option)}
              >
                {option}
              </div>
            ))}

          {onAddOption && (
            <>
              {isAddingNew ? (
                <div className="p-2 border-t border-[#c8bfa9] dark:border-[#2a2a2a]">
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
                      className="flex-1 h-8 text-sm bg-white dark:bg-[#121212] border-[#c8bfa9] dark:border-[#2a2a2a] text-[#121212] dark:text-[#e6dfd1]"
                      autoFocus
                    />
                    <Button 
                      size="sm" 
                      className="ml-1 h-8 bg-[#ff6b6b] hover:bg-[#ff8787] text-white"
                      onClick={handleAddOption}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  className="p-2 text-[#ff6b6b] hover:bg-[#f5f3ed] dark:hover:bg-[#1f1f1f] cursor-pointer flex items-center border-t border-[#c8bfa9] dark:border-[#2a2a2a]"
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

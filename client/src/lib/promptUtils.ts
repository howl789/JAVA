import { PromptRow, aiModels } from '@/data/initialData';

// Format a single row into a prompt string
export function formatRowPrompt(
  row: PromptRow, 
  modelId: string
): string {
  // Group cells by their content type
  const standardCells = row.cells.filter(cell => 
    cell.columnId !== 'negativePrompts' && 
    (typeof cell.value === 'string' ? cell.value !== '' : (cell.value as string[]).length > 0)
  );
  
  const negativeCells = row.cells.find(cell => cell.columnId === 'negativePrompts');
  
  // Format standard cells
  const mainPrompt = standardCells.map(cell => {
    if (Array.isArray(cell.value)) {
      // Handle multiselect
      return cell.value.join(', ');
    } else {
      // Handle dropdown
      return cell.value;
    }
  }).join(', ');
  
  // Format negative prompt if it exists
  let negativePrompt = '';
  if (negativeCells && Array.isArray(negativeCells.value) && negativeCells.value.length > 0) {
    negativePrompt = ` --no ${(negativeCells.value as string[]).join(', ')}`;
  }
  
  // Get model-specific formatting
  const model = aiModels.find(m => m.id === modelId);
  const modelFormat = model?.formatString ? ` ${model.formatString}` : '';
  
  // Combine all parts
  return `${mainPrompt}${negativePrompt}${modelFormat}`;
}

// Create prompt string from a row for clipboard
export function getPromptForClipboard(row: PromptRow, modelId: string): string {
  return formatRowPrompt(row, modelId);
}

// Validate that a row has essential components (e.g., subject)
export function isRowComplete(row: PromptRow): boolean {
  const subjectCell = row.cells.find(cell => cell.columnId === 'subject');
  return subjectCell !== undefined && subjectCell.value !== '';
}

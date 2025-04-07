import { PromptRow, columns, ExportFormat } from '@/data/initialData';
import { formatRowPrompt } from './promptUtils';

// Convert rows to CSV format
export function convertToCSV(rows: PromptRow[], modelId: string): string {
  // Create header row with column names
  const header = columns.map(col => col.name).join(',');
  
  // Create data rows
  const dataRows = rows.map(row => {
    return columns.map(column => {
      const cell = row.cells.find(c => c.columnId === column.id);
      if (!cell) return '';
      
      if (Array.isArray(cell.value)) {
        return `"${(cell.value as string[]).join('; ')}"`;
      } else {
        // Escape quotes for CSV
        return `"${(cell.value as string).replace(/"/g, '""')}"`;
      }
    }).join(',');
  });
  
  // Add an extra row with the complete prompts
  const promptRow = rows.map(row => `"${formatRowPrompt(row, modelId)}"`).join(',');
  
  return [header, ...dataRows, `Complete Prompt,${promptRow}`].join('\n');
}

// Convert rows to plain text format
export function convertToText(rows: PromptRow[], modelId: string): string {
  return rows.map((row, index) => {
    return `Prompt ${index + 1}: ${formatRowPrompt(row, modelId)}`;
  }).join('\n\n');
}

// Convert rows to JSON format
export function convertToJSON(rows: PromptRow[], modelId: string): string {
  const jsonData = rows.map((row, index) => {
    const cellData: Record<string, any> = {};
    
    row.cells.forEach(cell => {
      const column = columns.find(col => col.id === cell.columnId);
      if (column) {
        cellData[column.name] = cell.value;
      }
    });
    
    return {
      prompt_id: index + 1,
      components: cellData,
      formatted_prompt: formatRowPrompt(row, modelId)
    };
  });
  
  return JSON.stringify(jsonData, null, 2);
}

// Export data in the selected format
export function exportData(rows: PromptRow[], format: ExportFormat, modelId: string): void {
  let content = '';
  let mimeType = '';
  
  switch (format.id) {
    case 'csv':
      content = convertToCSV(rows, modelId);
      mimeType = 'text/csv';
      break;
    case 'json':
      content = convertToJSON(rows, modelId);
      mimeType = 'application/json';
      break;
    case 'txt':
    default:
      content = convertToText(rows, modelId);
      mimeType = 'text/plain';
      break;
  }
  
  // Create a blob and download link
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `anime-prompts.${format.extension}`;
  document.body.appendChild(link);
  link.click();
  
  // Clean up
  setTimeout(() => {
    URL.revokeObjectURL(url);
    document.body.removeChild(link);
  }, 0);
}

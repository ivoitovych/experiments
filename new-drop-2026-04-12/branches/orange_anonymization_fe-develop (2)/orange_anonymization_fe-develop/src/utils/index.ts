import { theme } from '@/theme';

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}…`;
}

export function formatScore(score: number): string {
  return `${(score * 100).toFixed(1)}%`;
}

export function entityColor(entityType: string): string {
  return (
    (theme.palette.entities as Record<string, string>)[entityType] ?? theme.palette.entities.DEFAULT
  );
}

export function extractSpan(text: string, start: number, end: number): string {
  return text.slice(start, end);
}

export function formatDate(isoString: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(isoString));
}

export function downloadAsFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function toCSV(rows: Record<string, unknown>[]): string {
  if (rows.length === 0) return '';
  const headers = Object.keys(rows[0]);
  const lines = rows.map((row) => headers.map((h) => JSON.stringify(row[h] ?? '')).join(','));
  return [headers.join(','), ...lines].join('\n');
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}…`;
}

export function formatScore(score: number): string {
  return `${(score * 100).toFixed(1)}%`;
}

export function entityColor(entityType: string): string {
  const colors: Record<string, string> = {
    PERSON: '#1565C0',
    EMAIL_ADDRESS: '#6A1B9A',
    PHONE_NUMBER: '#00695C',
    US_SSN: '#B71C1C',
    LOCATION: '#E65100',
    DATE_TIME: '#283593',
    CREDIT_CARD: '#880E4F',
    IP_ADDRESS: '#1B5E20',
    MEDICAL_LICENSE: '#0D47A1',
    URL: '#4E342E',
  };
  return colors[entityType] ?? '#37474F';
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

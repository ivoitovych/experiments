/**
 * General-purpose utility functions
 *
 * Keep these pure (no side effects, no imports from our own app modules).
 * They must be independently testable.
 */

/**
 * Truncates a string to a max length and appends "…" if truncated.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}…`;
}

/**
 * Formats a confidence score (0–1) to a percentage string.
 * @example formatScore(0.9543) → "95.4%"
 */
export function formatScore(score: number): string {
  return `${(score * 100).toFixed(1)}%`;
}

/**
 * Returns a color for a given Presidio entity type.
 * Used for entity highlights and badges.
 */
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

/**
 * Extracts the text span from a string given start/end character indices.
 */
export function extractSpan(text: string, start: number, end: number): string {
  return text.slice(start, end);
}

/**
 * Converts a UTC ISO string to a human-readable local date.
 * @example formatDate("2024-03-01T10:00:00Z") → "Mar 1, 2024"
 */
export function formatDate(isoString: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(isoString));
}

/**
 * Downloads a string as a file in the browser.
 */
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

/**
 * Converts an array of objects to CSV string.
 */
export function toCSV(rows: Record<string, unknown>[]): string {
  if (rows.length === 0) return '';
  const headers = Object.keys(rows[0]);
  const lines = rows.map((row) =>
    headers.map((h) => JSON.stringify(row[h] ?? '')).join(','),
  );
  return [headers.join(','), ...lines].join('\n');
}

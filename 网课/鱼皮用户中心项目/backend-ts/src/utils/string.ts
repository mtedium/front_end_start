export function isStringBlank(...values: string[]): boolean {
  return values.some(v => !v || v.trim().length === 0);
}
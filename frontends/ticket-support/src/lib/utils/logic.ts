/**
 * Functions created for (business) logic simplicity
 */

// Usage: switchCase(Object)(fallbackValue)(value)
export const switchCase = (cases: Record<string, unknown>) => (defaultCase: any) => (key: string) =>
  cases?.hasOwnProperty(key) ? cases[key] : defaultCase

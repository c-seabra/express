import { DateTime, Duration } from 'luxon';

/**
 * Format DateTime ISO helper
 *
 * Note: export func or static class usage can be discussed and revisited
 * @param isoDate
 */

export const formatDefaultDateTime = (isoDate?: string): string => {
  if (!isoDate) {
    return '';
  }

  const date = DateTime.fromISO(isoDate);
  return date.toLocaleString(DateTime.DATETIME_SHORT);
};

export const formatDateTime = (dateTime: string) => {
  const formattedDateTime = new Date(dateTime);
  return formattedDateTime.toString();
};

export const isIsoDate = (value: string): boolean => {
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(value)) return false;
  const d = new Date(value);
  return d.toISOString() === value;
};

export const formatFullDate = (isoDate?: string): string => {
  if (!isoDate) {
    return 'N/A';
  }

  const date = DateTime.fromISO(isoDate);
  return date.toLocaleString(DateTime.DATE_FULL);
};

export const formatFullDateTime = (isoDate?: string): string => {
  if (!isoDate) {
    return 'N/A';
  }

  const date = DateTime.fromISO(isoDate);
  return date.toLocaleString(DateTime.DATETIME_FULL);
};

export const toShortDate = (dateTime: string): string => {
  return new Date(dateTime).toISOString().slice(0, 10);
};

export const toShortDateTime = (dateTime: string): string => {
  return new Date(dateTime).toISOString().slice(0, 16);
};

export const timeTo = (startIsoDate: string): Duration => {
  const startDate = DateTime.fromISO(startIsoDate);
  const date2 = DateTime.fromISO(new Date().toISOString());

  return startDate.diff(date2, ['years', 'months', 'days', 'hours']);
};

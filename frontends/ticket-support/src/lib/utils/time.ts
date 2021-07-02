import { DateTime } from 'luxon';

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

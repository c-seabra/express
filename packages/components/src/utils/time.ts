import { DateTime } from 'luxon';

export const formatFullDate = (isoDate?: string): string => {
  if (!isoDate) {
    return 'N/A';
  }

  const date = DateTime.fromISO(isoDate);
  return date.toLocaleString(DateTime.DATE_FULL);
};

export const toShortDate = (dateTime: string): string => {
  return new Date(dateTime).toISOString().slice(0, 10);
};

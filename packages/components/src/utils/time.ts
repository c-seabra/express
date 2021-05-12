import { DateTime, Duration } from 'luxon';

/**
 * Format DateTime ISO helper
 *
 * Note: export func or static class usage can be discussed and revisited
 * @param isoDate
 */

export const getNow = () => {
  return DateTime.now().toLocaleString();
};

export const formatDefaultDateTime = (isoDate?: string): string => {
  if (!isoDate) {
    return '';
  }

  const date = DateTime.fromISO(isoDate);
  return date.toLocaleString(DateTime.DATETIME_SHORT);
};

export const getTimeZoneAbbreviation = (timeZoneIanaName: string) => {
  return DateTime.now().setZone(timeZoneIanaName).toFormat('ZZZZ');
};

export const formatDateTime = (dateTime: string) => {
  const formattedDateTime = new Date(dateTime);
  return formattedDateTime.toString();
};

const fromIso = (value: string, timezoneIanaName?: string) => {
  return DateTime.fromISO(
    value,
    timezoneIanaName ? { zone: timezoneIanaName } : undefined,
  );
};

export const toIsoDateTime = (value: string, timezoneIanaName?: string) => {
  return fromIso(value, timezoneIanaName).toISO();
};

export const formatFullDate = (isoDate?: string): string => {
  if (!isoDate) {
    return 'N/A';
  }

  const date = DateTime.fromISO(isoDate);
  return date.toLocaleString(DateTime.DATE_FULL);
};

export const formatFullDateTime = (
  isoDate?: string,
  timezoneIanaName?: string,
): string => {
  if (!isoDate) {
    return 'N/A';
  }

  const date = fromIso(isoDate, timezoneIanaName);

  if (timezoneIanaName) {
    return `${date.toLocaleString(DateTime.DATETIME_MED)} ${date.toFormat(
      'ZZZZ',
    )}`;
  }

  return fromIso(isoDate, timezoneIanaName).toLocaleString(
    DateTime.DATETIME_FULL,
  );
};

export const toShortDate = (
  dateTime: string,
  timezoneIanaName?: string,
): string => {
  return fromIso(dateTime, timezoneIanaName).toString().slice(0, 12);
};

export const toShortDateTime = (
  dateTime: string,
  timezoneIanaName?: string,
): string => {
  return fromIso(dateTime, timezoneIanaName).toString().slice(0, 16);
};

export const timeTo = (startIsoDate: string): Duration => {
  const startDate = DateTime.fromISO(startIsoDate);
  const date2 = DateTime.fromISO(new Date().toISOString());

  return startDate.diff(date2, ['days']);
};

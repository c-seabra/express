import { DateTime } from 'luxon'

/**
 * Format DateTime ISO helper
 *
 * Note: export func or static class usage can be discussed and revisited
 * @param isoDate
 */

export const formatDefaultDateTime = (isoDate: string): string => {
  const date = DateTime.fromISO(isoDate)
  return date.toLocaleString(DateTime.DATETIME_SHORT)
}

export const formatDateTime = (dateTime: string) => {
  const formattedDateTime = new Date(dateTime)
  return formattedDateTime.toString()
}

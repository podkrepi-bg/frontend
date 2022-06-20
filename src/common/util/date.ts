import { format, formatRelative, intervalToDuration, Locale } from 'date-fns'

export const formatDate = 'dd-MM-yyyy'
export const formatDatetime = 'dd MMMM yyyy H:ii:ss'

export const dateFormatter = (value: Date | string | number) => {
  const date = new Date(value)
  const exact = format(date, formatDatetime)
  const relative = formatRelative(date, new Date())
  return `${exact} (${relative})`
}

export const formatDateString = (dateString: string | Date) => {
  const date = new Date(dateString)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()

  return `${day}.${month}.${year}`
}

export const getRelativeDate = (value: Date | string, locale?: Locale) => {
  const date = new Date(value)
  return formatRelative(date, new Date(), { locale })
}

/**
 * Gets the duration in time from the specified date until now
 * @param date Date to get the interval from
 */
export const getDurationUntilNow = (date: Date) => {
  return intervalToDuration({ start: date, end: new Date() })
}

export const getExactDate = (value: Date | string | number | undefined) => {
  if (!value) return '---'

  const date = new Date(value)
  return format(date, formatDatetime)
}

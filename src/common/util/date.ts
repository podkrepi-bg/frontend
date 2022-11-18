import { format, formatRelative, intervalToDuration, Locale } from 'date-fns'

export const formatDate = 'dd MMM yyyy'
export const formatDatetime = 'dd MMM yyyy HH:mm:ss'

export const dateFormatter = (value: Date | string | number, locale?: Locale) => {
  const date = new Date(value)
  const exact = format(date, formatDatetime, { locale })
  const relative = formatRelative(date, new Date(), { locale })
  return `${exact} (${relative})`
}

export const formatDateString = (dateString: string | Date, locale?: string | undefined) => {
  if (locale) {
    return Intl.DateTimeFormat(locale.split('-')).format(new Date(dateString))
  }
  return new Date(dateString).toLocaleDateString()
}

export const getRelativeDate = (value: Date | string, locale?: Locale) => {
  const date = new Date(value)
  return formatRelative(date, new Date(), { locale })
}

/**
 * Value format for storing and passing date strings. Should be used whenever we pass date strings between components.
 */
export const DATE_VALUE_FORMAT = 'yyyy-MM-dd'

/**
 * Utility to return localized date format string.
 * @param language Language to get the corresponding date format
 * @returns Format string
 */
export const getDateFormat = (language: string) => {
  const dateParts = Intl.DateTimeFormat(language.split('-')).formatToParts(new Date())

  // Find the separator i.e. ".", "/", etc.
  const literal = dateParts.find((part) => part.type === 'literal')

  // Extract the locale date format
  return dateParts
    .filter((part) => part.type !== 'literal')
    .map((part) => {
      switch (part.type) {
        case 'day':
          return 'dd'
        case 'month':
          return 'MM'
        case 'year':
          return 'yyyy'
        default:
          return ''
      }
    })
    .join(literal?.value ?? '')
}

/**
 * Gets the duration in time from the specified date until now
 * @param date Date to get the interval from
 */
export const getDurationUntilNow = (date: Date) => {
  return intervalToDuration({ start: date, end: new Date() })
}

export const getExactDateTime = (value: Date | string | number | undefined, locale?: Locale) => {
  if (!value) return '---'

  const date = new Date(value)
  return format(date, formatDatetime, { locale })
}

export const getExactDate = (value: Date | string | number | undefined, locale?: Locale) => {
  if (!value) return '---'

  const date = new Date(value)
  return format(date, formatDate, { locale })
}

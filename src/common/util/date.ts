import { Duration, format, formatRelative, intervalToDuration } from 'date-fns'

export const formatDate = 'yyyy-MM-dd'
export const formatDatetime = 'yyyy-MM-dd H:ii:ss'

export const dateFormatter = (value: Date | string | number) => {
  const date = new Date(value)
  const exact = format(date, formatDatetime)
  const relative = formatRelative(date, new Date())
  return `${exact} (${relative})`
}

export const formatDateString = (dateString: string) => {
  const date = new Date(dateString)
  const day = date.getDate()
  const month = date.getMonth().toString().padStart(2, '0')
  const year = date.getFullYear()

  return `${day}.${month}.${year}`
}

export const getRelativeDate = (value: Date | string) => {
  const date = new Date(value)
  return formatRelative(date, new Date())
}

export const getDurationUntilNow = (date: Date) => {
  return intervalToDuration({ start: date, end: new Date() })
}

export const formatDuration = (duration: Duration) => {
  let formattedString = ''
  if (duration.seconds != 0) {
    formattedString = `${duration.seconds} seconds ago`
  }
  if (duration.minutes != 0) {
    formattedString = `${duration.minutes} minutes ago`
  }
  if (duration.hours != 0) {
    formattedString = `${duration.hours} hours ago`
  }
  if (duration.days != 0) {
    formattedString = `${duration.days} days ago`
  }

  return formattedString
}

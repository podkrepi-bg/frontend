import { format, formatRelative } from 'date-fns'

export const formatDate = 'dd-MM-yyyy'
export const formatDatetime = 'dd-MM-yyyy H:ii:ss'

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

export const getExactDate = (value: Date | string | number) => {
  const date = new Date(value)
  return format(date, formatDatetime)
}

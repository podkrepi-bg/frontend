import { format, formatRelative } from 'date-fns'

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

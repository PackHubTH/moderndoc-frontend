import { format } from 'date-fns'
import { th } from 'date-fns/locale'

export const formatPhoneNumber = (phones: string) => {
  try {
    return phones
      .split(',')
      .map((phone) => {
        return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
      })
      .join(', ')
  } catch (e) {
    return '-'
  }
}

export const formatFullDatetime = (datetime: string | Date) => {
  return format(datetime, 'dd MMM yy, HH:mm:ss', {
    locale: th,
  })
}

export const formatDate = (datetime: string | Date) => {
  return format(datetime, 'dd MMM yy', {
    locale: th,
  })
}

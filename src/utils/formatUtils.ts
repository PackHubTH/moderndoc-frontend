export const formatPhoneNumbers = (phones: string) => {
  return phones
    .split(',')
    .map((phone) => {
      return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
    })
    .join(', ')
}

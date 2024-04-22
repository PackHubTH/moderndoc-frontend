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

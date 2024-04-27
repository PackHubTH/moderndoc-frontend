export const fetchFile = async (url: string) => {
  try {
    const response = await fetch(url)
    const blob = await response.blob()
    const file = new File([blob], getFilename(url), { type: blob.type })
    return file
  } catch (error) {
    console.error('Error fetching and processing file:', error)
  }
}

export const getFilePath = (url: string) => {
  return url.split('/').slice(3).join('/')
}

export const getFilename = (url: string) => {
  return url.split('/').pop()?.split('?')[0] ?? ''
}

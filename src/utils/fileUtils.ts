import DocIcon from '@/modules/document/assets/doc-icon.png'
import JpgIcon from '@/modules/document/assets/jpg-icon.png'
import PdfIcon from '@/modules/document/assets/pdf-icon.png'
import PngIcon from '@/modules/document/assets/png-icon.png'

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
  const fileName = url.split('/').pop()?.split('?')[0] ?? ''
  const utf8FileName = decodeURIComponent(fileName)

  return utf8FileName
}

export const getFileExtension = (url: string) => {
  return url.split('.').pop() ?? ''
}

export const getFileExtensionIcon = (url: string) => {
  const extension = getFileExtension(url)
  switch (extension) {
    case 'doc':
      return DocIcon
    case 'docx':
      return DocIcon
    case 'pdf':
      return PdfIcon
    case 'jpg':
    case 'jpeg':
      return JpgIcon
    case 'png':
      return PngIcon
    default:
      return DocIcon
  }
}

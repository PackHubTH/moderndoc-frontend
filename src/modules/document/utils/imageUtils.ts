import NotAvailableImage from '@/assets/not-available-image.png'
import moderndocApi from '@/moderndocApi'
import { getFilePath } from '@/utils/fileUtils'
import { ApiResponse } from 'types/response'

export const getPrivateImageUrl = async (url: string) => {
  let image = NotAvailableImage

  const result = await moderndocApi.post<ApiResponse<string>>('/get-file', {
    filename: getFilePath(url),
  })

  if (result.data) {
    image = result.data.data
  }

  return image
}

export const onErrorImage = (
  e: React.SyntheticEvent<HTMLImageElement, Event>
) => {
  e.currentTarget.src = NotAvailableImage
}

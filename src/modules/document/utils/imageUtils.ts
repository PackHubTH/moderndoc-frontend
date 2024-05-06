import NotAvailableImage from '@/assets/not-available-image.png'
import moderndocApi from '@/moderndocApi'
import { DEFAULT_PROFILE_IMG } from '@/modules/user/constants'
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

export const onErrorProfileImage = (
  e: React.SyntheticEvent<HTMLImageElement, Event>
) => {
  e.currentTarget.src = DEFAULT_PROFILE_IMG
}

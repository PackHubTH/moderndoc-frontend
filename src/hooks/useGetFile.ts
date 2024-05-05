import moderndocApi from '@/moderndocApi'
import { getFilePath } from '@/utils/fileUtils'
import { useQuery } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'

const useGetFile = (url: string) => {
  const decodedUrl = decodeURIComponent(url)

  const context = useQuery(
    ['get-file', url],
    async () => {
      const response = await moderndocApi.post<ApiResponse<string>>(
        '/get-file',
        {
          filename: getFilePath(decodedUrl),
        }
      )
      return response.data
    },
    { enabled: false }
  )

  return context
}

export default useGetFile

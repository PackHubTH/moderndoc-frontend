import moderndocApi from '@/moderndocApi'
import { getFilePath } from '@/utils/fileUtils'
import { useMutation } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'

const useGetFileMutate = () => {
  const context = useMutation(['get-file'], async (url: string) => {
    const response = await moderndocApi.post<ApiResponse<string>>('/get-file', {
      filename: getFilePath(url),
    })
    return response.data
  })

  return context
}

export default useGetFileMutate

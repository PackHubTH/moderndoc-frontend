import moderndocApi from '@/moderndocApi'
import { useQuery } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'

const useGetFile = (url: string) => {
  const context = useQuery(['get-file', url], async () => {
    const response = await moderndocApi.post<ApiResponse<string>>('/get-file', {
      filename: url.split('/').slice(3).join('/'),
    })
    return response.data
  })

  return context
}

export default useGetFile

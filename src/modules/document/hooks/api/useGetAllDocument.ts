import moderndocApi from '@/moderndocApi'
import { useQuery } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'
import { Document } from '../../types/types'

const useGetAllDocument = (page: number, type: string) => {
  const context = useQuery(['get-document', page], async () => {
    const response = await moderndocApi.get<ApiResponse<Document[]>>(
      '/document',
      {
        params: {
          page,
          type,
        },
      }
    )
    return response.data
  })

  return context
}

export default useGetAllDocument

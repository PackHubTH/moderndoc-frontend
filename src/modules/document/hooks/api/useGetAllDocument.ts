import { ApiResponse } from 'types/response'
import { GetDocuments } from '../../types/response'
import moderndocApi from '@/moderndocApi'
import { useQuery } from '@tanstack/react-query'

const useGetAllDocument = (page: number, type: string) => {
  const context = useQuery(['get-document', page], async () => {
    const response = await moderndocApi.get<ApiResponse<GetDocuments>>(
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

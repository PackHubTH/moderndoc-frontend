import moderndocApi from '@/moderndocApi'
import { useQuery } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'
import { GetDocuments } from '../../types/response'

const useGetAllDocument = (page: number, state: string) => {
  const context = useQuery(['get-document', page], async () => {
    const response = await moderndocApi.get<ApiResponse<GetDocuments>>(
      '/document',
      {
        params: {
          page,
          state,
        },
      }
    )
    return response.data
  })

  return context
}

export default useGetAllDocument

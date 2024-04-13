import moderndocApi from '@/moderndocApi'
import { useQuery } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'
import { GetDocumentById } from '../../types/response'

const useGetDocumentById = (id: string) => {
  const context = useQuery(['get-document', id], async () => {
    const response = await moderndocApi.get<ApiResponse<GetDocumentById>>(
      `/document/${id}`
    )
    return response.data
  })

  return context
}

export default useGetDocumentById

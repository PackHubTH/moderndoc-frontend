import moderndocApi from '@/moderndocApi'
import { useQuery } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'
import { GetDocumentById } from '../../../document/types/response'

const useGetTemplateById = (id: string) => {
  if (!id) return { data: null }
  const context = useQuery(['get-template', id], async () => {
    const response = await moderndocApi.get<ApiResponse<GetDocumentById>>(
      `/template/${id}`
    )
    return response.data
  })

  return context
}

export default useGetTemplateById

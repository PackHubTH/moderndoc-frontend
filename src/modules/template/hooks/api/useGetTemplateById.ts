import moderndocApi from '@/moderndocApi'
import { useQuery } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'
import { GetTemplateById } from '../../types/response'

const useGetTemplateById = (id: string) => {
  if (!id) return { data: null }
  const context = useQuery(
    ['get-template', id],
    async () => {
      const response = await moderndocApi.get<ApiResponse<GetTemplateById>>(
        `/template/${id}`
      )
      return response.data
    },
    {
      staleTime: Infinity,
    }
  )

  return context
}

export default useGetTemplateById

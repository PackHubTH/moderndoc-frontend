import moderndocApi from '@/moderndocApi'
import { useMutation } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'

const useDeleteTemplate = () => {
  const context = useMutation(['delete-template'], async (id: string) => {
    const response = await moderndocApi.delete<ApiResponse<unknown | null>>(
      `/template/${id}`
    )
    return response.data
  })

  return context
}

export default useDeleteTemplate

import moderndocApi from '@/moderndocApi'
import { useMutation } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'

const useDeleteFaq = () => {
  const context = useMutation(['delete-faq'], async (id: string) => {
    const response = await moderndocApi.delete<ApiResponse<unknown | null>>(
      `/faq/${id}`
    )
    return response.data
  })

  return context
}

export default useDeleteFaq

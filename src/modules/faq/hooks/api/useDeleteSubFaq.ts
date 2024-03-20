import moderndocApi from '@/moderndocApi'
import { useMutation } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'

const useDeleteSubFaq = () => {
  const context = useMutation(['delete-sub-fag'], async (subFaqId: string) => {
    const response = await moderndocApi.delete<ApiResponse<unknown | null>>(
      `/faq/sub-faq/${subFaqId}`
    )
    return response.data
  })

  return context
}

export default useDeleteSubFaq

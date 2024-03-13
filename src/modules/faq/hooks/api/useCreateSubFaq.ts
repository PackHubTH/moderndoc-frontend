import moderndocApi from '@/moderndocApi'
import { useMutation } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'

type CreateSubFaqPayload = {
  title: string
  description: string
  faqId: string
}

const useCreateSubFaq = () => {
  const context = useMutation(
    ['create-sub-faq'],
    async (data: CreateSubFaqPayload) => {
      const response = await moderndocApi.post<ApiResponse<unknown | null>>(
        '/faq/sub-faq',
        data
      )
      return response.data
    }
  )

  return context
}

export default useCreateSubFaq

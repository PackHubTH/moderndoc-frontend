import moderndocApi from '@/moderndocApi'
import { useMutation } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'
import { CreateFaqForm } from '../useCreateFaqForm/validation'

const useCreateFaq = () => {
  const context = useMutation(['create-faq'], async (data: CreateFaqForm) => {
    const response = await moderndocApi.post<ApiResponse<unknown | null>>(
      '/faq',
      data
    )
    return response.data
  })

  return context
}

export default useCreateFaq

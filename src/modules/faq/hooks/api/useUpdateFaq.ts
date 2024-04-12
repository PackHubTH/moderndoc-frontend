import moderndocApi from '@/moderndocApi'
import { useMutation } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'
import { CreateFaqForm } from '../useCreateFaqForm/validation'

const useUpdateFaq = (id?: string) => {
  const context = useMutation(['update-faq'], async (data: CreateFaqForm) => {
    const response = await moderndocApi.put<ApiResponse<unknown | null>>(
      '/faq',
      { id, ...data }
    )
    return response.data
  })

  return context
}

export default useUpdateFaq

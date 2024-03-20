import moderndocApi from '@/moderndocApi'
import { useMutation } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'

type Params = {
  id: string
  title: string
  description: string
}

const useUpdateSubFaq = () => {
  const context = useMutation(['update-sub-faq'], async (params: Params) => {
    const response = await moderndocApi.put<ApiResponse<unknown | null>>(
      '/faq/sub-faq',
      params
    )
    return response.data
  })

  return context
}

export default useUpdateSubFaq

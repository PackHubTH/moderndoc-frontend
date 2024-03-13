import moderndocApi from '@/moderndocApi'
import { useQuery } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'
import { GetFaqsListResponse } from '../types'

const useGetPublicFaqs = (page: number) => {
  const context = useQuery(['public-faqs', page], async () => {
    const response = await moderndocApi.get<ApiResponse<GetFaqsListResponse>>(
      '/faq',
      {
        params: {
          page,
        },
      }
    )
    return response.data
  })

  return context
}

export default useGetPublicFaqs

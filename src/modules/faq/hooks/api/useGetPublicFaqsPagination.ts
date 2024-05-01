import moderndocApi from '@/moderndocApi'
import { useQuery } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'
import { GetFaqsListResponse } from '../types'

const useGetPublicFaqsPagination = (
  page?: number,
  search?: string,
  tagId?: string
) => {
  return useQuery(
    ['public-faqs', page, search, tagId],
    async ({ pageParam = 1 }) => {
      const response = await moderndocApi.get<ApiResponse<GetFaqsListResponse>>(
        '/faq',
        {
          params: {
            page,
            search,
            tagId,
          },
        }
      )
      return response.data
    }
  )
}

export default useGetPublicFaqsPagination

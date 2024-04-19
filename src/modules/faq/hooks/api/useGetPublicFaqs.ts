import moderndocApi from '@/moderndocApi'
import { useInfiniteQuery } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'
import { GetFaqsListResponse } from '../types'

const useGetPublicFaqs = (search?: string, tagId?: string) => {
  return useInfiniteQuery(
    ['public-faqs'],
    async ({ pageParam = 1 }) => {
      const response = await moderndocApi.get<ApiResponse<GetFaqsListResponse>>(
        '/faq',
        {
          params: {
            page: pageParam,
            search,
            tagId,
          },
        }
      )
      return response.data
    },
    {
      getNextPageParam: (lastPage, pages) => {
        if (pages.length + 1 > lastPage.data.totalPages) return undefined
        return pages.length + 1
      },
    }
  )
}

export default useGetPublicFaqs

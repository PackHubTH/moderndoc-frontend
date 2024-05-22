import moderndocApi from '@/moderndocApi'
import { useInfiniteQuery } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'
import { GetFaqsListResponse } from '../types'

const useGetPublicFaqs = (
  search?: string,
  tagId?: string,
  departmentId?: string
) => {
  return useInfiniteQuery(
    ['public-faqs', search, tagId, departmentId],
    async ({ pageParam = 1 }) => {
      const response = await moderndocApi.get<ApiResponse<GetFaqsListResponse>>(
        '/faq',
        {
          params: {
            page: pageParam,
            search,
            tagIds: [tagId],
            departmentIds: [departmentId],
          },
        }
      )
      return response.data
    },
    {
      cacheTime: 0,
      getNextPageParam: (lastPage, pages) => {
        if (pages.length + 1 > lastPage.data.totalPages) return undefined
        return pages.length + 1
      },
    }
  )
}

export default useGetPublicFaqs

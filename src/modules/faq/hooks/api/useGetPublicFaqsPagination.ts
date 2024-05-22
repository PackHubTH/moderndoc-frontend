import moderndocApi from '@/moderndocApi'
import { useQuery } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'
import { GetFaqsListResponse } from '../types'

const useGetPublicFaqsPagination = (
  page?: number,
  search?: string,
  tagIds?: string[],
  departmentIds?: string[]
) => {
  return useQuery(
    ['public-faqs', page, search, tagIds, departmentIds],
    async ({ pageParam = 1 }) => {
      const response = await moderndocApi.get<ApiResponse<GetFaqsListResponse>>(
        '/faq',
        {
          params: {
            page,
            search,
            tagIds,
            departmentIds,
          },
        }
      )
      return response.data
    }
  )
}

export default useGetPublicFaqsPagination

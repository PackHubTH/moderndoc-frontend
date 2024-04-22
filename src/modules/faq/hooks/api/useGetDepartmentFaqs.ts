import moderndocApi from '@/moderndocApi'
import { useQuery } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'
import { GetFaqsListResponse } from '../types'

const useGetDepartmentFaqs = (
  page: number,
  search: string = '',
  isAdmin: boolean = false
) => {
  const context = useQuery(['department-faqs', page, search], async () => {
    const path = isAdmin ? '/faq/department' : '/faq'
    const response = await moderndocApi.get<ApiResponse<GetFaqsListResponse>>(
      path,
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

export default useGetDepartmentFaqs

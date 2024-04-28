import moderndocApi from '@/moderndocApi'
import { useQuery } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'
import { GetFaqsListResponse } from '../types'

const useGetDepartmentFaqs = (
  page: number,
  search: string = '',
  isAdmin: boolean = false
) => {
  const path = isAdmin ? '/faq' : '/faq/department'
  const queryKey = isAdmin ? 'admin-faqs' : 'department-faqs'
  const context = useQuery([queryKey, page, search], async () => {
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

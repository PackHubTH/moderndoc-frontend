import moderndocApi from '@/moderndocApi'
import { useQuery } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'
import { GetFaqsListResponse } from '../types'

const useGetDepartmentFaqs = (page: number) => {
  const context = useQuery(['department-faqs', page], async () => {
    const response = await moderndocApi.get<ApiResponse<GetFaqsListResponse>>(
      '/faq/department',
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

import moderndocApi from '@/moderndocApi'
import { useQuery } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'
import { GetCourseByIdResponse } from '../types'

const useGetDepartmentById = (id: string) => {
  const context = useQuery(['department', id], async () => {
    const response = await moderndocApi.get<ApiResponse<GetCourseByIdResponse>>(
      `/department/${id}`
    )
    return response.data
  })

  return context
}

export default useGetDepartmentById

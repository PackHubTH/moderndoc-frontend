import moderndocApi from '@/moderndocApi'
import { useQuery } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'
import { GetCourseByIdResponse } from '../types'

const useGetCourseById = (id?: string) => {
  const context = useQuery(
    ['course', id],
    async () => {
      const response = await moderndocApi.get<
        ApiResponse<GetCourseByIdResponse>
      >(`/course/${id}`)
      return response.data
    },
    {
      enabled: !!id && id !== '',
    }
  )

  return context
}

export default useGetCourseById

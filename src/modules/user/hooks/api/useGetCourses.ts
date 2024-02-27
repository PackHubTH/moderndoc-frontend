import moderndocApi from '@/moderndocApi'
import { useQuery } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'
import { Level } from 'types/user'
import { Course } from '../types'

const useGetCourses = (departmentId?: string, level?: Level) => {
  const context = useQuery(['courses', departmentId, level], async () => {
    const response = await moderndocApi.get<ApiResponse<Course[]>>('/course', {
      params: {
        departmentId,
        level,
      },
    })
    return response.data
  })

  return context
}

export default useGetCourses

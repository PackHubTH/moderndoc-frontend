import moderndocApi from '@/moderndocApi'
import { useQuery } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'
import { Level } from 'types/user'
import { Tag } from '../../types'

const useGetAllTags = (departmentId?: string, level?: Level) => {
  const context = useQuery(['courses', departmentId, level], async () => {
    const response = await moderndocApi.get<ApiResponse<Tag[]>>('/tag')
    return response.data
  })

  return context
}

export default useGetAllTags

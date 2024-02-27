import moderndocApi from '@/moderndocApi'
import { useQuery } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'
import { User } from '../types'

const useGetTeachersByName = (name?: string) => {
  const context = useQuery(
    ['teachers', name],
    async () => {
      const response = await moderndocApi.get<ApiResponse<User[]>>(
        '/user/teacher',
        {
          params: {
            name,
          },
        }
      )
      return response.data
    },
    {
      enabled: !!name && name.length > 0,
    }
  )

  return context
}

export default useGetTeachersByName

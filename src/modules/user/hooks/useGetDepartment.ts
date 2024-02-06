import moderndocApi from '@/moderndocApi'
import { useQuery } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'
import { Department } from './types'

const useGetDepartments = (facultyId?: string) => {
  const context = useQuery(['departments', facultyId], async () => {
    const response = await moderndocApi.get<ApiResponse<Department[]>>(
      '/department',
      {
        params: {
          facultyId,
        },
      }
    )
    return response.data
  })

  return context
}

export default useGetDepartments

import moderndocApi from '@/moderndocApi'
import { useQuery } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'
import { GetDepartmentByIdResponse } from '../types'

const useGetDepartmentById = (id: string) => {
  const context = useQuery(
    ['department', id],
    async () => {
      const response = await moderndocApi.get<
        ApiResponse<GetDepartmentByIdResponse>
      >(`/department/${id}`)
      return response.data
    },
    {
      enabled: !!id && id !== '',
    }
  )

  return context
}

export default useGetDepartmentById

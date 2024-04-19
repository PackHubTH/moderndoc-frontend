import moderndocApi from '@/moderndocApi'
import { useQuery } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'
import { GetUsersByDepartmentId } from '../../../template/types/response'

const useGetUsersByDepartmentId = (id: string) => {
  const context = useQuery(['user-department', id], async () => {
    if (!id) return Promise.resolve({ data: [] })
    const response = await moderndocApi.get<
      ApiResponse<GetUsersByDepartmentId[]>
    >(`/user/department/${id}`)
    return response.data
  })

  return context
}

export default useGetUsersByDepartmentId

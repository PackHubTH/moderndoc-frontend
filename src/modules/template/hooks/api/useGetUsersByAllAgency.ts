import moderndocApi from '@/moderndocApi'
import { useQuery } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'
import { GetUsersByDepartmentId } from '../../types/response'

const useGetUsersByAllAgency = (id: string) => {
  const context = useQuery(
    ['users-all-agency', id],
    async () => {
      const response = await moderndocApi.get<
        ApiResponse<GetUsersByDepartmentId[]>
      >(`/user/department/${id}`)
      return response.data
    },
    {
      enabled: false,
    }
  )

  return context
}

export default useGetUsersByAllAgency

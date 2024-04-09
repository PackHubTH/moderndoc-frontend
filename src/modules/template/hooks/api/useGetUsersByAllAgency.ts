import moderndocApi from '@/moderndocApi'
import { useQuery } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'
import { GetUsersByAllAgency } from '../../types/response'

const useGetUsersByAllAgency = () => {
  const context = useQuery(['users-all-agency'], async () => {
    const response =
      await moderndocApi.get<ApiResponse<GetUsersByAllAgency[]>>(
        '/user/department'
      )
    return response.data
  })

  return context
}

export default useGetUsersByAllAgency

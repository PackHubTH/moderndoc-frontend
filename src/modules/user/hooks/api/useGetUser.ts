import moderndocApi from '@/moderndocApi'
import { useUserStore } from '@/stores/userStore'
import { useQuery } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'
import { User } from '../types'

const useGetUser = () => {
  const id = useUserStore.getState().user?.id

  const context = useQuery(
    ['user', id],
    async () => {
      const response = await moderndocApi.get<ApiResponse<User>>('/user')
      return response.data
    },
    {
      cacheTime: 0,
      staleTime: 0,
    }
  )

  return context
}

export default useGetUser

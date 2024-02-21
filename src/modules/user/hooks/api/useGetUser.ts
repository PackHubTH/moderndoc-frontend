import moderndocApi from '@/moderndocApi'
import { useQuery } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'
import { User } from '../types'

const useGetUser = () => {
  const context = useQuery(['user'], async () => {
    const response = await moderndocApi.get<ApiResponse<User>>('/user')
    return response.data
  })

  return context
}

export default useGetUser

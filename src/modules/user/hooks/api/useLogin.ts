import moderndocApi from '@/moderndocApi'
import { useMutation } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'
import { User } from '../types'

const useLogin = () => {
  const context = useMutation(async (accessToken: string) => {
    const response = await moderndocApi.post<ApiResponse<User | null>>(
      '/user/login',
      {
        accessToken,
      }
    )
    return response.data
  })

  return context
}

export default useLogin

import moderndocApi from '@/moderndocApi'
import { useMutation } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'
import { User } from '../types'

const useLogin = () => {
  const context = useMutation(['login'], async (email: string) => {
    const response = await moderndocApi.post<ApiResponse<User | null>>(
      '/user/login',
      {
        email,
      }
    )
    return response.data
  })

  return context
}

export default useLogin

import moderndocApi from '@/moderndocApi'
import { useMutation } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'
import { User } from '../types'

const useUpdateProfile = () => {
  const context = useMutation(['updateProfile'], async (data: any) => {
    const response = await moderndocApi.put<ApiResponse<User | null>>(
      '/user',
      data
    )
    return response.data
  })

  return context
}

export default useUpdateProfile

import moderndocApi from '@/moderndocApi'
import { useMutation } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'
import { User } from '../types'
import { CreateProfileForm } from '../useCreateProfileForm/validation'

export const useRegister = () => {
  const context = useMutation(['register'], async (data: CreateProfileForm) => {
    let apiPath = ''

    switch (data.role) {
      case 'STUDENT':
        apiPath = '/user/student'
        break
      case 'STAFF' || 'ADMIN':
        apiPath = '/user/staff'
        break
      case 'ADMIN':
        apiPath = '/user/admin'
        break
    }

    const response = await moderndocApi.post<ApiResponse<User | null>>(
      apiPath,
      data
    )
    return response.data
  })

  return context
}

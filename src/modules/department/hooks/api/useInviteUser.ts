import moderndocApi from '@/moderndocApi'
import { useMutation } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'
import { InviteUserForm } from '../useInviteUserForm/validation'

const useInviteUser = () => {
  const context = useMutation(
    ['approve-department-member'],
    async (params: InviteUserForm) => {
      const response = await moderndocApi.post<ApiResponse<unknown | null>>(
        '/user/invite',
        params
      )
      return response.data
    }
  )

  return context
}

export default useInviteUser

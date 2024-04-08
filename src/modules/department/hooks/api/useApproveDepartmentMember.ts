import moderndocApi from '@/moderndocApi'
import { useMutation } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'

type Params = {
  memberUserId: string
  isApproved: boolean
}

const useApproveDepartmentMember = () => {
  const context = useMutation(
    ['approve-department-member'],
    async (params: Params) => {
      const response = await moderndocApi.put<ApiResponse<unknown | null>>(
        '/department/approve-member',
        params
      )
      return response.data
    }
  )

  return context
}

export default useApproveDepartmentMember

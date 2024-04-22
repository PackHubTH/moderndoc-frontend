import moderndocApi from '@/moderndocApi'
import { useMutation } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'

type Params = {
  memberId: string
  departmentId: string
}

const useSwapMemberDepartment = () => {
  const context = useMutation(['swap-department'], async (params: Params) => {
    const response = await moderndocApi.put<ApiResponse<unknown | null>>(
      '/department/swap',
      params
    )
    return response.data
  })

  return context
}

export default useSwapMemberDepartment

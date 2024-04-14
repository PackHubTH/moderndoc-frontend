import moderndocApi from '@/moderndocApi'
import { useMutation } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'

type Params = {
  departmentId: string
}

const useChangeDepartment = () => {
  const context = useMutation(['change-department'], async (params: Params) => {
    const response = await moderndocApi.put<ApiResponse<unknown | null>>(
      '/user/department',
      params
    )
    return response.data
  })

  return context
}

export default useChangeDepartment

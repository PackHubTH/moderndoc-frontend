import moderndocApi from '@/moderndocApi'
import { useMutation } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'

type Params = {
  name: string
  departmentId: string
}

const useUpdateDepartment = () => {
  const context = useMutation(['update-department'], async (params: Params) => {
    const response = await moderndocApi.put<ApiResponse<unknown | null>>(
      '/department/',
      params
    )
    return response.data
  })

  return context
}

export default useUpdateDepartment

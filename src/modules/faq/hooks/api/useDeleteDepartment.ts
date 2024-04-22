import moderndocApi from '@/moderndocApi'
import { useMutation } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'

const useDeleteDepartment = () => {
  const context = useMutation(
    ['delete-department'],
    async (departmentId: string) => {
      const response = await moderndocApi.delete<ApiResponse<unknown | null>>(
        `/department/${departmentId}`
      )
      return response.data
    }
  )

  return context
}

export default useDeleteDepartment

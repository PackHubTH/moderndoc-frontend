import moderndocApi from '@/moderndocApi'
import { useMutation } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'

const useCreateAgencyDepartment = () => {
  const context = useMutation(
    ['create-agency-department'],
    async (name: string) => {
      const response = await moderndocApi.post<ApiResponse<unknown | null>>(
        '/department/agency',
        { name }
      )
      return response.data
    }
  )

  return context
}

export default useCreateAgencyDepartment

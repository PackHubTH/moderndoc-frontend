import moderndocApi from '@/moderndocApi'
import { useMutation } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'

type Params = {
  documentId: string
  operatorUserId: string
  message: string
  isEditable: boolean
}

const useAssignOperator = () => {
  const context = useMutation(['assign-operator'], async (data: Params) => {
    const response = await moderndocApi.post<ApiResponse<unknown | null>>(
      '/document/assign-operator',
      data
    )
    return response.data
  })

  return context
}

export default useAssignOperator

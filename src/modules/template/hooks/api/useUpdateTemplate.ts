import moderndocApi from '@/moderndocApi'
import { useMutation } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'

type Params = {
  id: string
  title: string
  description: string
  exampleFile?: string
  operatorId: string[]
  operatorGroup: string
  element: any
}

const useUpdateTemplate = () => {
  const context = useMutation(['update-template'], async (data: Params) => {
    const response = await moderndocApi.put<ApiResponse<unknown | null>>(
      '/template',
      data
    )
    return response.data
  })

  return context
}

export default useUpdateTemplate

import moderndocApi from '@/moderndocApi'
import { useMutation } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'

type Params = {
  title: string
  description: string
  exampleFile?: string
  operatorId: string[]
  operatorGroup: string
  templateFile: string
  element: any
  departmentId?: string
}

const useCreateTemplate = () => {
  const context = useMutation(['create-template'], async (data: Params) => {
    const response = await moderndocApi.post<ApiResponse<unknown | null>>(
      '/template',
      data
    )
    return response.data
  })

  return context
}

export default useCreateTemplate

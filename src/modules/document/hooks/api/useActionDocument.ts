import moderndocApi from '@/moderndocApi'
import { useMutation } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'

type Params = {
  documentId: string
  element: any
  action: string
  message: string
  receiverId: string
}

const useActionDocument = () => {
  const context = useMutation(['action-document'], async (data: Params) => {
    const response = await moderndocApi.post<ApiResponse<unknown | null>>(
      '/document/action',
      data
    )
    return response.data
  })

  return context
}

export default useActionDocument

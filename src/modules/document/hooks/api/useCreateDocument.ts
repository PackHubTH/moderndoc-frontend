import moderndocApi from '@/moderndocApi'
import { useMutation } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'
import { CreateDocument } from '../../types/response'
import { DocumentStatus } from '../../types/types'

type Params = {
  templateId: string
  element: any
  documentStatus: DocumentStatus
}

const useCreateDocument = () => {
  const context = useMutation(['create-document'], async (data: Params) => {
    const response = await moderndocApi.post<ApiResponse<CreateDocument>>(
      '/document',
      data
    )
    return response.data
  })

  return context
}

export default useCreateDocument

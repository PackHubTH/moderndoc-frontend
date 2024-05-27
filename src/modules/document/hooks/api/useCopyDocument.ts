import moderndocApi from '@/moderndocApi'
import { useMutation } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'
import { CreateDocument } from '../../types/response'
import { DocumentStatus } from '../../types/types'

type Params = {
  templateFile: string
  element: any
  documentStatus: DocumentStatus
}

const useCopyDocument = () => {
  const context = useMutation(['copy-document'], async (data: Params) => {
    const response = await moderndocApi.post<ApiResponse<CreateDocument>>(
      '/document/copy',
      data
    )
    return response.data
  })

  return context
}

export default useCopyDocument

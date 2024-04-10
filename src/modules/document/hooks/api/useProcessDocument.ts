import moderndocApi from '@/moderndocApi'
import { useMutation } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'
import { DocumentStatus } from '../../types/types'

// TODO: fix this
type Params = {
  templateId: string
  element: any
  documentStatus: DocumentStatus
}

const useProcessDocument = () => {
  const context = useMutation(['process-document'], async (data: Params) => {
    const response = await moderndocApi.post<ApiResponse<unknown | null>>(
      '/document',
      data
    )
    return response.data
  })

  return context
}

export default useProcessDocument

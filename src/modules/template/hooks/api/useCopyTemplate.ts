import moderndocApi from '@/moderndocApi'
import { useMutation } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'

const useCopyTemplate = () => {
  const context = useMutation(['copy-template'], async (id: string) => {
    const response = await moderndocApi.post<ApiResponse<unknown | null>>(
      `/template/copy/${id}`
    )
    return response.data
  })

  return context
}

export default useCopyTemplate

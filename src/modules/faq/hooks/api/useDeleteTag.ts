import moderndocApi from '@/moderndocApi'
import { useMutation } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'

const useDeleteTag = () => {
  const context = useMutation(['delete-tag'], async (tagId: string) => {
    const response = await moderndocApi.delete<ApiResponse<unknown | null>>(
      `/tag/${tagId}`
    )
    return response.data
  })

  return context
}

export default useDeleteTag

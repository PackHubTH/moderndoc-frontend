import moderndocApi from '@/moderndocApi'
import { useMutation } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'

type Params = {
  tagId: string
  name: string
}

const useEditTag = () => {
  const context = useMutation(['edit-tag'], async (params: Params) => {
    const response = await moderndocApi.put<ApiResponse<unknown | null>>(
      '/tag',
      params
    )
    return response.data
  })

  return context
}

export default useEditTag

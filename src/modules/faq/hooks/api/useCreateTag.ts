import moderndocApi from '@/moderndocApi'
import { useMutation } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'

const useCreateTag = () => {
  const context = useMutation(['create-tag'], async (name: string) => {
    const response = await moderndocApi.post<ApiResponse<unknown | null>>(
      '/tag',
      { name }
    )
    return response.data
  })

  return context
}

export default useCreateTag

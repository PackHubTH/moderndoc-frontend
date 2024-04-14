import moderndocApi from '@/moderndocApi'
import { useQuery } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'
import { GetOperatorsByTemplateId } from '../../types/response'

const useGetOperatorsByTemplateId = (templateId: string) => {
  const context = useQuery(['get-operators', templateId], async () => {
    const response = await moderndocApi.get<
      ApiResponse<GetOperatorsByTemplateId[]>
    >(`/template/operators/${templateId}`)
    return response.data
  })

  return context
}

export default useGetOperatorsByTemplateId

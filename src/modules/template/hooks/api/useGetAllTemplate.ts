import moderndocApi from '@/moderndocApi'
import { useQuery } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'
import { GetAllTemplateResponse } from '../../types/response'

const useGetAllTemplate = (page: number, search: string = '') => {
  const context = useQuery(['get-template', page, search], async () => {
    const response = await moderndocApi.get<
      ApiResponse<GetAllTemplateResponse>
    >('/template', {
      params: {
        page,
      },
    })
    return response.data
  })

  return context
}

export default useGetAllTemplate

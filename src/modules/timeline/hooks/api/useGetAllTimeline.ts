import moderndocApi from '@/moderndocApi'
import { useQuery } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'
import { GetAllTimeline } from '../../types/response'

const useGetAllTimeline = (page: number) => {
  const context = useQuery(['get-all-timeline', page], async () => {
    const response = await moderndocApi.get<ApiResponse<GetAllTimeline>>(
      '/document/timeline',
      {
        params: {
          page,
        },
      }
    )
    return response.data
  })

  return context
}

export default useGetAllTimeline

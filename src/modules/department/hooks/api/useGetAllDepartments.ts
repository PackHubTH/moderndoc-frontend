import moderndocApi from '@/moderndocApi'
import { useQuery } from '@tanstack/react-query'
import { ListResponse } from 'types/response'
import { GetAllDepartmentsResponse } from './types'

const useGetAllDepartments = (page: number = 1) => {
  const context = useQuery(['get-all-departments'], async () => {
    const response = await moderndocApi.get<
      ListResponse<GetAllDepartmentsResponse>
    >('/department/all', {
      params: {
        page,
      },
    })
    return response.data
  })

  return context
}

export default useGetAllDepartments

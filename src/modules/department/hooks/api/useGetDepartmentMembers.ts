import moderndocApi from '@/moderndocApi'
import { useQuery } from '@tanstack/react-query'
import { ListResponse } from 'types/response'
import { GetDepartmentMemberResponse } from './types'

const useGetDepartmentMembers = (isApproved: boolean = true) => {
  const context = useQuery(['departments', isApproved], async () => {
    const response = await moderndocApi.get<
      ListResponse<GetDepartmentMemberResponse>
    >('/department/members', {
      params: {
        isApproved,
      },
    })
    return response.data
  })

  return context
}

export default useGetDepartmentMembers

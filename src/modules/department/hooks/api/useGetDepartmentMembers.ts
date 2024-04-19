import moderndocApi from '@/moderndocApi'
import { useQuery } from '@tanstack/react-query'
import { ListResponse } from 'types/response'
import { GetDepartmentMemberResponse } from './types'

const useGetDepartmentMembers = (
  page: number = 1,
  isApproved: boolean = true,
  departmentId?: string
) => {
  const context = useQuery(
    ['department-members', page, isApproved, departmentId],
    async () => {
      const response = await moderndocApi.get<
        ListResponse<GetDepartmentMemberResponse>
      >('/department/members', {
        params: {
          page,
          isApproved,
          departmentId,
        },
      })
      return response.data
    }
  )

  return context
}

export default useGetDepartmentMembers

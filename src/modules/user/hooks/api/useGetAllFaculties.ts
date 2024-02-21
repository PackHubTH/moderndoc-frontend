import moderndocApi from '@/moderndocApi'
import { useQuery } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'
import { Faculty } from '../types'

const useGetAllFaculties = () => {
  const context = useQuery(['faculties'], async () => {
    const response = await moderndocApi.get<ApiResponse<Faculty[]>>('/faculty')
    return response.data
  })

  return context
}

export default useGetAllFaculties

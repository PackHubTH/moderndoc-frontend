import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { ApiResponse } from 'types/response'
import { User } from '../types'

const useGetUserByToken = () => {
  const context = useMutation(async (token: string) => {
    const response = await axios.get<ApiResponse<User>>(
      `${process.env.VITE_API_ENDPOINT_URL}/user`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response.data
  })

  return context
}

export default useGetUserByToken

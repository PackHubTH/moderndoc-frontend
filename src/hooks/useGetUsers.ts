import Person from '@/models/Person'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const useGetUsers = () => {
  const context = useQuery<Person, Error, Person>(
    ['getUsers'],
    async () => {
      const { data } = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
      )
      return data
    },
    {
      cacheTime: 1000 * 60 * 3,
      staleTime: 1000 * 60 * 3,
      onError: (error) => {
        window.location.assign('/error')
      },
    }
  )
  return context
}

export default useGetUsers

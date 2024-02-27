import axios from 'axios'
import { useUserStore } from './stores/userStore'

const instance = axios.create({
  baseURL: process.env.VITE_API_ENDPOINT_URL,
})

const userStore = useUserStore.getState()

instance.defaults.headers.common['Authorization'] = `Bearer ${userStore.token}`

useUserStore.subscribe((userStore) => {
  instance.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${userStore.token}`
})

export default instance

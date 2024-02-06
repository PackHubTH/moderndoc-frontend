import axios from 'axios'
import { useUserStore } from './stores/userStore'

const instance = axios.create({
  baseURL: process.env.VITE_API_ENDPOINT_URL,
})

const token = useUserStore.getState().token
useUserStore.subscribe(console.log)

instance.defaults.headers.common['Authorization'] = token

export default instance

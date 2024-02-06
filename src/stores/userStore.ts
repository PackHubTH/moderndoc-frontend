import Person from '@/models/Person'
import { create } from 'zustand'

type UserStore = {
  isLogin: boolean
  user: Person
  setIsLogin: (isLogin: boolean) => void
  setUser: (user: Person, token: string) => void
  token: string
}

export const useUserStore = create<UserStore>((set) => ({
  isLogin: false,
  user: {
    id: '',
    name: '',
    username: '',
  },
  setIsLogin: (isLogin) => set({ isLogin }),
  setUser: (user, token) => set({ user, token }),
  token: 'my-token',
}))

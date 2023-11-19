import Person from '@/models/Person'
import { create } from 'zustand'

type UserStore = {
  isLogin: boolean
  user: Person
  setIsLogin: (isLogin: boolean) => void
  setUser: (user: Person) => void
}

export const useUserStore = create<UserStore>((set) => ({
  isLogin: false,
  user: {
    id: '',
    name: '',
    username: '',
  },
  setIsLogin: (isLogin) => set({ isLogin }),
  setUser: (user) => set({ user }),
}))

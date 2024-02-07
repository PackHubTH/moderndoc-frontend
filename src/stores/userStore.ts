import { User } from '@/modules/user/hooks/types'
import { create } from 'zustand'

type UserStore = {
  email: string
  setEmail: (email: string) => void
  isLogin: boolean
  user: User
  setIsLogin: (isLogin: boolean) => void
  setUser: (user: User, token: string) => void
  token: string
}

export const useUserStore = create<UserStore>((set) => ({
  isLogin: false,
  email: '',
  setEmail: (email) => set({ email }),
  user: {} as User,
  setIsLogin: (isLogin) => set({ isLogin }),
  setUser: (user, token) => set({ user, token }),
  token: 'my-token',
}))

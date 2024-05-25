import { User } from '@/modules/user/hooks/types'
import { StateCreator, create } from 'zustand'
import { PersistOptions, persist } from 'zustand/middleware'

type UserStore = {
  email: string
  setEmail: (email: string) => void
  isLogin: boolean
  user: User
  setIsLogin: (isLogin: boolean) => void
  setUser: (user: User, token: string) => void
  token: string
  setToken: (token: string) => void
  logout: () => void
}

type MyPersist = (
  config: StateCreator<UserStore>,
  options: PersistOptions<UserStore>
) => StateCreator<UserStore>

export const useUserStore = create<UserStore>(
  (persist as MyPersist)(
    (set) => ({
      isLogin: false,
      email: '',
      setEmail: (email) => set({ email }),
      user: {} as User,
      setIsLogin: (isLogin) => set({ isLogin }),
      setUser: (user, token) => set({ user, token }),
      token: 'my-token',
      setToken: (token) => set({ token }),
      logout: () => set({ isLogin: false, user: {} as User, token: '' }),
    }),
    {
      name: 'user-storage',
      getStorage: () => localStorage,
    }
  )
)

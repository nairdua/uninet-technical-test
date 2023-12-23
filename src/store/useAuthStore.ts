import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: number
  first_name: string
  last_name: string
  avatar: string
}

interface AuthStore {
  user: User
  email: string
  token: string | null
  login: (token: string, email: string) => void
  logout: () => void
}

const BLANK_USER = {
  id: -1,
  email: '',
  first_name: '',
  last_name: '',
  avatar: '',
}

export const useAuthStore = create<AuthStore>()(
  persist(
    set => ({
      user: BLANK_USER,
      email: '',
      token: null,
      login: (token: string, email: string) =>
        set(() => ({ token: token, email: email })),
      logout: () => set({ token: null, user: BLANK_USER, email: '' }),
    }),
    {
      name: 'auth',
    },
  ),
)

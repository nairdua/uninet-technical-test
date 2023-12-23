import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthStore {
  token: string | null
  login: (token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    set => ({
      token: null,
      login: (token: string) => set(() => ({ token: token })),
      logout: () => set({ token: null }),
    }),
    {
      name: 'token',
    },
  ),
)

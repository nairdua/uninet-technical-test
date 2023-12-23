import { create } from 'zustand'

type ShowModalFn = (
  children: React.ReactNode,
  centered?: boolean,
  staticModal?: boolean,
) => void

interface ModalStore {
  show: boolean
  closeModal: () => void
  centered: boolean
  static: boolean
  children: React.ReactNode | null
  showModal: ShowModalFn
}

export const useModalStore = create<ModalStore>(set => ({
  show: false,
  closeModal: () => set(() => ({ show: false })),
  centered: false,
  children: null,
  static: false,
  showModal: (children = null, centered = false, staticModal = false) => {
    set(() => ({
      show: true,
      children,
      centered,
      static: staticModal,
    }))
  },
}))

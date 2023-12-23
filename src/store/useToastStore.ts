import create from 'zustand'

type ToastVariants =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | ''

type toastFunction = (
  variant: ToastVariants,
  message: string,
  header?: string,
  delay?: number,
) => void

interface ToastStore {
  show: boolean
  closeToast: () => void
  message: string
  header: string
  variant: ToastVariants
  delay: number
  showToast: toastFunction
}

export const useToaastStore = create<ToastStore>(set => ({
  show: false,
  closeToast: () => set(() => ({ show: false })),
  message: '',
  header: '',
  variant: 'primary' as ToastVariants,
  delay: 500,
  showToast: (variant, message, header, delay) => {
    set(() => ({
      show: true,
      variant,
      message,
      header,
      delay,
    }))
  },
}))

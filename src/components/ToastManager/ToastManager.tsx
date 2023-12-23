import { Toast, ToastContainer } from 'react-bootstrap'
import { useToaastStore } from 'store/useToastStore'

export default function ToastManager() {
  const store = useToaastStore()

  const ToastComponent = (
    <ToastContainer position="top-end" className="p-3">
      <Toast
        autohide
        bg={store.variant}
        show={store.show}
        onClose={store.closeToast}
        delay={store.delay}
      >
        <Toast.Header>
          <strong className="me-auto">{store.header ?? 'Notification'}</strong>
        </Toast.Header>
        <Toast.Body
          className={
            ['warning', 'light'].includes(store.variant) ? '' : 'text-white'
          }
        >
          <p>{store.message}</p>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  )

  return ToastComponent
}

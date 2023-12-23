import { Modal } from 'react-bootstrap'
import { useModalStore } from 'store'

export default function ModalManager() {
  const store = useModalStore()

  const ModalComponent = (
    <Modal
      show={store.show}
      onHide={store.closeModal}
      centered={store.centered}
      static={store.static}
    >
      {store.children}
    </Modal>
  )

  return ModalComponent
}

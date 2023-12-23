import { Button, Modal } from 'react-bootstrap'

interface DeleteModalProps {
  onCancel?: () => void
  onConfirm?: () => void
}

export default function DeleteModal(props: DeleteModalProps) {
  const { onCancel, onConfirm } = props

  function handleCancel() {
    if (onCancel) {
      onCancel()
    }
  }

  function handleConfirm() {
    if (onConfirm) {
      onConfirm()
    }
  }

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Delete post?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this post? This cannot be undone.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleConfirm}>
          Delete
        </Button>
      </Modal.Footer>
    </>
  )
}

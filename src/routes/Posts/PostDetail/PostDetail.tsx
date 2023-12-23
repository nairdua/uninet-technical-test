import { db } from 'firebase'
import { deleteDoc, doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Button, Container, Placeholder, Stack } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useModalStore, useToastStore } from 'store'
import { DeleteModal } from '../components'

export default function PostDetail() {
  const { postId } = useParams()

  const [post, setPost] = useState({
    title: '',
    text: '',
  })

  const modal = useModalStore()
  const toast = useToastStore()
  const navigate = useNavigate()

  function showDeleteModal() {
    if (!postId) {
      toast.showToast('danger', 'Invalid post ID')
      console.error('Invalid post ID')
      return
    }

    modal.showModal(
      <DeleteModal
        onCancel={cancelDelete}
        onConfirm={() => deletePost(postId)}
      />,
      true,
    )
  }

  function cancelDelete() {
    modal.closeModal()
  }

  async function deletePost(id: string) {
    try {
      const docRef = doc(db, 'posts', id)
      await deleteDoc(docRef)
      toast.showToast('success', 'Successfully deleted the post!')
      modal.closeModal()
      navigate('/posts')
    } catch (e) {
      toast.showToast('danger', 'Something went wrong while deleting the post.')
      console.error(e)
    }
  }

  useEffect(() => {
    async function fetchPost() {
      try {
        if (!postId) {
          return
        }
        const docRef = doc(db, 'posts', postId)
        await getDoc(docRef).then(resp => {
          const postData = resp.data()
          setPost(postData as { title: string; text: string })
        })
      } catch (e) {
        console.error(e)
      }
    }

    fetchPost()
  }, [postId])

  return (
    <Container>
      <Stack direction="horizontal" className="my-3" gap={1}>
        {post.title ? (
          <h1 className="my-3 me-auto">{post.title}</h1>
        ) : (
          <Placeholder animation="glow" className="my-3" />
        )}
        <Link to="edit">
          <Button variant="primary">Edit</Button>
        </Link>
        <Button variant="danger" onClick={showDeleteModal}>
          Delete
        </Button>
      </Stack>
      {post.text ? (
        <p>{post.text}</p>
      ) : (
        <Placeholder animation="glow" size="lg" />
      )}
    </Container>
  )
}

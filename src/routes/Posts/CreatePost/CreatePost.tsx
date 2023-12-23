import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import PostForm, { PostFormData } from '../components/PostForm'
import { useToastStore } from 'store'
import { addDoc, collection } from 'firebase/firestore'
import { db } from 'firebase'

export default function CreatePost() {
  const navigate = useNavigate()
  const toast = useToastStore()

  function cancelCreate() {
    navigate('..')
  }

  async function submitPost(data: PostFormData) {
    try {
      await addDoc(collection(db, 'posts'), data)
      toast.showToast('success', 'Your post has been successfully created!')
      navigate('..')
    } catch (e) {
      toast.showToast(
        'danger',
        'Sorry, something went wrong when creating your post.',
      )
      console.error(e)
    }
  }

  return (
    <Container>
      <h1 className="my-3">Create Post</h1>
      <PostForm onCancel={cancelCreate} onSubmit={data => submitPost(data)} />
    </Container>
  )
}

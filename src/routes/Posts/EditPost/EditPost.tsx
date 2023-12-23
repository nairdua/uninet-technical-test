import { Container } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from 'firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'

import { useToastStore } from 'store'
import PostForm, { PostFormData } from '../components/PostForm'

export default function EditPost() {
  const { postId } = useParams()
  const navigate = useNavigate()
  const toast = useToastStore()

  const [postData, setPostData] = useState<PostFormData | null>()

  function cancelEdit() {
    navigate('..')
  }

  async function submitEdit(data: PostFormData) {
    try {
      if (!postId) {
        return
      }
      const docRef = doc(db, 'posts', postId)
      await updateDoc(docRef, {
        title: data.title,
        text: data.text,
      })
      toast.showToast('success', 'Successfully updated your post!')
      navigate('/posts')
    } catch (e) {
      toast.showToast('danger', 'Something went wrong when updating your post.')
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
          const data = resp.data()
          setPostData({
            title: data?.title,
            text: data?.text.trim(),
          })
        })
      } catch (e) {
        console.error(e)
      }
    }

    fetchPost()
  }, [postId])

  return (
    <Container>
      <h1 className="my-3">Edit Post</h1>
      {postData && (
        <PostForm
          initialData={postData}
          onCancel={cancelEdit}
          onSubmit={data => submitEdit(data)}
        />
      )}
    </Container>
  )
}

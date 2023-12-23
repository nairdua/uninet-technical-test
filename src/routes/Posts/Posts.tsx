import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardGroup, Container } from 'react-bootstrap'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'

import { db } from 'firebase'
import { useModalStore, useToastStore } from 'store'

import { DeleteModal } from './components'

export interface PostTimestamp {
  nanoseconds: number
  seconds: number
}

export interface Post {
  id: string
  text: string
  title: string
  timestamp: PostTimestamp
}

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([])
  const modal = useModalStore()
  const toast = useToastStore()

  function showDeleteModal(id: string) {
    modal.showModal(
      <DeleteModal onCancel={cancelDelete} onConfirm={() => deletePost(id)} />,
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
      fetchPosts()
    } catch (e) {
      toast.showToast('danger', 'Something went wrong while deleting the post.')
      console.error(e)
    }
  }

  async function fetchPosts() {
    await getDocs(collection(db, 'posts')).then(querySnapshot => {
      const newData = querySnapshot.docs.map(doc => ({
        ...(doc.data() as {
          text: string
          title: string
          timestamp: PostTimestamp
        }),
        id: doc.id,
      }))
      console.log(newData)
      setPosts(newData as Post[])
    })
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const PostsList = (
    <CardGroup>
      {posts.map(post => (
        <Card key={post.id} style={{ width: '18rem', cursor: 'pointer' }}>
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text style={{ textOverflow: 'ellipsis' }}>
              {post.text.substring(0, 120)}
            </Card.Text>
            <Card.Link as={Button} variant="primary">
              View
            </Card.Link>
            <Card.Link
              as={Button}
              variant="danger"
              onClick={() => showDeleteModal(post.id)}
            >
              Delete
            </Card.Link>
          </Card.Body>
        </Card>
      ))}
    </CardGroup>
  )

  const NoPosts = (
    <Container>
      <h2 className="text-center">No posts here yet...</h2>
    </Container>
  )

  return (
    <Container>
      <h1 className="my-3">Posts</h1>
      <Link to="create">
        <Button variant="primary" className="mb-3">
          Create new post
        </Button>
      </Link>
      {posts.length > 0 ? PostsList : NoPosts}
    </Container>
  )
}

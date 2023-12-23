import { Button, Card, CardGroup, Container } from 'react-bootstrap'
import { collection, getDocs } from 'firebase/firestore'
import { db } from 'fiebase'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

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

  return (
    <Container>
      <h1 className="my-3">Posts</h1>
      <Link to="create">
        <Button variant="primary" className="mb-3">
          Create new post
        </Button>
      </Link>
      <CardGroup>
        {posts.map(post => (
          <Card style={{ width: '18rem', cursor: 'pointer' }}>
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Text style={{ textOverflow: 'ellipsis' }}>
                {post.text.substring(0, 120)}
              </Card.Text>
              <Card.Link as={Button} variant="primary">
                Visit
              </Card.Link>
              <Card.Link as={Button} variant="danger">
                Delete
              </Card.Link>
            </Card.Body>
          </Card>
        ))}
      </CardGroup>
    </Container>
  )
}

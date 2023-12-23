import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { collection, getDocs } from 'firebase/firestore'

import { db } from 'firebase'

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

  const PostsList = (
    <Row xs={1} md={2} className="g-4">
      {posts.map(post => (
        <Col key={post.id}>
          <Link to={post.id} className="text-decoration-none">
            <Card className="h-100 flex-fill" style={{ cursor: 'pointer' }}>
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text style={{ textOverflow: 'ellipsis' }}>
                  {post.text.substring(0, 120)}
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
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

import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// import { useNavigate } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Stack from 'react-bootstrap/Stack'

import { LOGIN } from 'api/auth'

import { useAuthStore } from 'store/useAuthStore'

import { LoginForm } from './components'
import { LoginFormData } from './components/LoginForm'

export default function Login() {
  const navigate = useNavigate()

  const [error, setError] = useState('')
  const store = useAuthStore()

  async function loginUser(data: LoginFormData) {
    axios
      .post(LOGIN, data)
      .then(res => {
        // TODO AUTH
        store.login(res.data.token)
        console.log(res.data)
        navigate('/')
      })
      .catch(err => {
        console.log(err.response.data)
        setError(err.response.data.error)
      })
  }

  function registerUser() {
    navigate('/register')
  }

  return (
    <Stack className="vh-100 justify-content-center">
      <Container>
        <Row>
          <Col>
            <h1 className="mb-3">Welcome!</h1>
            <p>Please enter your credentials.</p>
          </Col>
          <Col sm>
            <LoginForm
              onLogin={loginUser}
              onRegister={registerUser}
              error={error}
            />
          </Col>
        </Row>
      </Container>
    </Stack>
  )
}

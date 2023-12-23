import { useState } from 'react'
import { Col, Container, Row, Stack } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import { REGISTER } from 'api/auth'
import { useToaastStore } from 'store/useToastStore'

import { RegisterForm } from './components'
import { RegisterFormData } from './components/RegisterForm'

export default function Register() {
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const toast = useToaastStore()

  async function registerUser(data: RegisterFormData) {
    axios
      .post(REGISTER, data)
      .then(() => {
        // console.log(res.data)
        toast.showToast('success', 'Successfully registered user!')
        navigate('/login')
      })
      .catch(err => {
        toast.showToast('danger', 'An error occurred while registering you')
        setError(err.response.data.error)
      })
  }

  return (
    <Stack className="vh-100 justify-content-center">
      <Container>
        <Row>
          <Col>
            <h1 className="mb-3">Register</h1>
          </Col>
          <Col sm>
            <RegisterForm onRegister={registerUser} error={error} />
          </Col>
        </Row>
      </Container>
    </Stack>
  )
}

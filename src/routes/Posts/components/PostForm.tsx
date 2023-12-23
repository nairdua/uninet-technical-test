import React, { useState } from 'react'
import { Button, Form, FormCheck, FormControl, Stack } from 'react-bootstrap'

export interface PostFormData {
  title: string
  text: string
}

export interface PostFormProps {
  initialData?: PostFormData
  onSubmit?: (data: PostFormData) => void
  onCancel?: () => void
}

export default function PostForm(props: PostFormProps) {
  const { initialData, onSubmit, onCancel } = props

  const [formData, setFormData] = useState({
    title: initialData?.title ?? '',
    text: initialData?.text ?? '',
  })

  const [errors, setErrors] = useState({
    title: '',
    text: '',
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!formData.title.length || !formData.text.length) {
      setErrors(() => ({
        title: formData.title.length < 1 ? 'Required' : '',
        text: formData.text.length < 1 ? 'Required' : '',
      }))
      e.stopPropagation()
      return
    } else {
      if (onSubmit) {
        onSubmit(formData)
      }
    }
  }

  function handleCancel() {
    if (onCancel) {
      onCancel()
    }
  }

  function handleForm(col: string, val: string) {
    setFormData(prev => ({
      ...prev,
      [col]: val,
    }))
  }

  return (
    <>
      <Form noValidate onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Post title</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter post title"
            value={formData.title}
            onChange={e => handleForm('title', e.target.value)}
            isInvalid={errors.title.length > 0}
          />
          <FormControl.Feedback type="invalid">
            {errors.title}
          </FormControl.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="text">
          <Form.Label>Post</Form.Label>
          <Form.Control
            required
            as="textarea"
            rows={5}
            placeholder="Write your post here..."
            value={formData.text}
            onChange={e => handleForm('text', e.target.value)}
            isInvalid={errors.text.length > 0}
          />
          <FormControl.Feedback type="invalid">
            {errors.text}
          </FormControl.Feedback>
        </Form.Group>
        <Stack className="justify-content-end" direction="horizontal" gap={3}>
          <Button variant="secondary" type="button" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Post
          </Button>
        </Stack>
      </Form>
    </>
  )
}

import { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth'

const UpdateProfile = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, changeEmail, changePassword } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleUpdateEmail(e) {
    e.preventDefault()

    setMessage('')
    setError('')
    
    if (!emailRef.current.value) {
      return setError('Please enter a new email to update')
    }

    if (emailRef.current.value === currentUser.email) {
      return setError('Please enter a new email to update')
    }

    try {
      setLoading(true)
      const credential = EmailAuthProvider.credential(currentUser.email, prompt(`Current Email: ${currentUser.email}\nNew Email: ${emailRef.current.value}\nPlease enter your current password to update email`))
      await reauthenticateWithCredential(currentUser, credential).then(async () => {
        try {
          await changeEmail(emailRef.current.value)
          setMessage('Email successfully updated')
        } catch {
          setError('Failed to update email')
        }
      })
    } catch {
      setError('Failed to authenticate')
    }

    setLoading(false)
  }

  async function handleUpdatePassword(e) {
    e.preventDefault()
    
    setMessage('')
    setError('')

    if (passwordRef.current.value.length < 6) {
      return setError('Password must be at least 6 characters')
    }
    
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match')
    }

    try {
      setLoading(true)
      const credential = EmailAuthProvider.credential(currentUser.email, prompt(`Email: ${currentUser.email}\nPlease enter your current password to update password`))
      await reauthenticateWithCredential(currentUser, credential).then(async () => {
        try {
          await changePassword(passwordRef.current.value)
          setMessage('Password successfully updated')
        } catch {
          setError('Failed to update password')
        }
      })
    } catch {
      setError('Failed to authenticate')
    }

    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Update Profile</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          {message && <Alert variant='success'>{message}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <Form onSubmit={handleUpdateEmail}>
            <Form.Group id='email' className='mt-4'>
              <Form.Label>New Email</Form.Label>
              <Form.Control type='email' ref={emailRef}></Form.Control>
            </Form.Group>
            <Button disabled={loading} className='w-100 mt-4 mb-4' type='submit'>
              Update Email
            </Button>
          </Form>
          <Form onSubmit={handleUpdatePassword}>
            <Form.Group id='password' className='mt-2'>
              <Form.Label>New Password</Form.Label>
              <Form.Control type='password' ref={passwordRef}></Form.Control>
            </Form.Group>
            <Form.Group id='password-confirm' className='mt-2'>
              <Form.Label>New Password Confirmation</Form.Label>
              <Form.Control type='password' ref={passwordConfirmRef}></Form.Control>
            </Form.Group>
            <Button disabled={loading} className='w-100 mt-4' type='submit'>
              Update Password
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2 boldShadow'>
        <Link to='/'>Return to Dashboard</Link>
      </div>
    </>
  )
}
export default UpdateProfile
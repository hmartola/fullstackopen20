import React, { useState } from 'react'
import { userLogin } from '../reducers/logReducer'
import { useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(userLogin({ username: username, password: password }))
    setUsername('')
    setPassword('')
  }

  return (
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>username</Form.Label>
        <Form.Control
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <Form.Label>password</Form.Label>
        <Form.Control
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <div style={{ marginTop: 10, marginLeft: 5 }}>
          <Button variant="success" type="submit">login</Button>
        </div>
      </Form.Group>
    </Form>
  )
}

export default LoginForm
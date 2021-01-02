import React, { useState } from 'react'
import { showMessage } from '../reducers/messageReducer'
import { userLogin } from '../reducers/logReducer'
import { useDispatch } from 'react-redux'

const LoginForm = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(userLogin({ username: username, password: password }))
      setUsername('')
      setPassword('')
      dispatch(showMessage(`Welcome ${username}`, 5))

    } catch (exception) {
      dispatch(showMessage('invalid username or password', 5))
      //console.log('logging in with', username, password)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="loginButton" type="submit">login</button>
    </form>
  )
}

export default LoginForm
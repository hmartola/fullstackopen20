import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
//import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Message from './components/Message'
import { showMessage } from './reducers/messageReducer'
import { initBlogs } from './reducers/blogReducer'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'

const App = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const removeBlog = async (blogObj) => {
    try {
      const confirm = window.confirm(`Remove blog '${blogObj.title}' by '${blogObj.author}'?`)
      if (confirm) {
        await blogService
          .remove(blogObj.id)
        dispatch(showMessage('Removed blog', 5))
      }
    } catch (e) {
      console.log(e)
    }
  }

  const addLike = async (blogObj) => {
    try {
      await blogService
        .update(blogObj.id, blogObj)
      dispatch(showMessage(`Liked '${blogObj.title}'!`, 5))
    } catch (e) {
      console.log(e)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      dispatch(showMessage(`Welcome ${user.name}`, 5))
    } catch (exception) {
      dispatch(showMessage('invalid username or password', 5))
      //console.log('logging in with', username, password)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
    dispatch(showMessage('Logged out', 5))
  }


  const loginForm = () => (
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

  if (user === null) {
    return (
      <div>
        <Message />
        <h2>Log in to use application</h2>
        {loginForm()}

      </div>
    )
  }

  return (
    <div>
      <Message />
      <h2>Bloglist</h2>
      <p>{user.name} logged in <button onClick={() => logout()}>logout</button></p>
      <BlogForm />
      <BlogList />
    </div>
  )
}

export default App

/* {blogs
        .sort((a,b) => a.likes < b.likes ? 1 : -1)
        .map(blog =>
          <Blog key={blog.id} blog={blog} like={() => addLike(blog)} remove={() => removeBlog(blog)} />
        )} */
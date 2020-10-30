import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Message from './components/Message'
import ErrorMessage from './components/ErrorMessage'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [errMessage, setErrMessage] = useState(null)
  const [blogVisible, setBlogVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (blogObj) => {
    try {
      const addedBlog = await blogService
        .create(blogObj)
      setBlogs(blogs.concat(addedBlog))
      setBlogVisible(false)
      setMessage(`A new blog ${blogObj.title} by ${blogObj.author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } catch (error) {
      setErrMessage('Could not create blog, check input')
      setTimeout(() => {
        setErrMessage(null)
      }, 3000)
    }
  }

  const removeBlog = async (blogObj) => {
    try {
      const confirm = window.confirm(`Remove blog ${blogObj.title} by ${blogObj.author}?`)
      if (confirm) {
        await blogService
          .remove(blogObj.id)
        setMessage('Removed blog')
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const addLike = async (blogObj) => {
    try {
      await blogService
        .update(blogObj.id, blogObj)
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
      setMessage(`Welcome ${user.name}`)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } catch (exception) {
      setErrMessage('invalid username or password')
      setTimeout(() => {
        setErrMessage(null)
      }, 3000)
      //console.log('logging in with', username, password)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
    setMessage('Logged out')
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  const blogForm = () => {
    const hideWhenVisible = { display: blogVisible ? 'none' : '' }
    const showWhenVisible = { display: blogVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogVisible(true)}>new blog</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm createBlog={addBlog}></BlogForm>
          <button onClick={() => setBlogVisible(false)}>cancel</button>
        </div>
      </div>
    )
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
        <ErrorMessage message={errMessage} />
        <Message message={message} />
        <h2>Log in to use application</h2>
        {loginForm()}

      </div>
    )
  }

  return (
    <div>
      <Message message={message} />
      <ErrorMessage message={errMessage} />
      <h2>Bloglist</h2>
      <p>{user.name} logged in <button onClick={() => logout()}>logout</button></p>
      {blogForm()}
      {blogs
        .sort((a,b) => a.likes < b.likes ? 1 : -1)
        .map(blog =>
          <Blog key={blog.id} blog={blog} like={() => addLike(blog)} remove={() => removeBlog(blog)} />
        )}
    </div>
  )
}

export default App
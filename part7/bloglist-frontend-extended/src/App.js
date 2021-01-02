import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Message from './components/Message'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import BlogPost from './components/BlogPost'
import UserInfo from './components/UserInfo'
import UserBlogs from './components/UserBlogs'
import { showMessage } from './reducers/messageReducer'
import { initBlogs } from './reducers/blogReducer'
import { userLogout, loggedIn } from './reducers/logReducer'
import { userList } from './reducers/userReducer'

const App = () => {

  const dispatch = useDispatch()
  const login = useSelector(store => store.login)

  useEffect(() => {
    dispatch(initBlogs())
    dispatch(userList())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(loggedIn(user))
    }
  }, [dispatch])

  const logout = () => {
    dispatch(userLogout())
    dispatch(showMessage('Logged out', 5))
  }

  const NavBar = () => {
    const padding = {
      paddingRight: 5
    }
    return (
      <div style={{ marginTop: 10, padding: 5, backgroundColor: 'lightgray' }}>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        {login.name} logged in <button onClick={() => logout()}>logout</button>
      </div>
    )
  }

  if (login === null) {
    return (
      <div>
        <Message />
        <h2>Log in to use application</h2>
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <Router>
        <Message />
        <NavBar />
        <h1>Bloglist</h1>
        <Switch>
          <Route path='/users/:id'>
            <UserBlogs />
          </Route>
          <Route path='/users'>
            <UserInfo />
          </Route>
          <Route path='/blogs/:id'>
            <BlogPost />
          </Route>
          <Route path='/'>
            <BlogForm />
            <BlogList />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
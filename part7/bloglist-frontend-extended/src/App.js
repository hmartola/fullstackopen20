import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar,  Nav, Button } from 'react-bootstrap'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Message from './components/Message'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import BlogPost from './components/BlogPost'
import UserInfo from './components/UserInfo'
import UserBlogs from './components/UserBlogs'
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
  }

  const NavBar = () => {
    const padding = {
      paddingRight: 5
    }
    return (
      <Navbar collapseOnSelect expand='sm' bg='dark' variant='dark'>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">users</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {login.name} logged in <Button onClick={() => logout()} size='sm' variant='danger'>logout</Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }

  if (login === null) {
    return (
      <div className='container'>
        <Message />
        <h2>Log in to use application</h2>
        <LoginForm />
      </div>
    )
  }

  return (
    <div className='container'>
      <Router>
        <Message />
        <NavBar />
        <h1 className='text-center' style={{ color: '#0080ff', marginTop: 10 }}>Bloglist</h1>
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
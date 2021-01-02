import loginService from '../services/login'
import blogService from '../services/blogs'

const logReducer = (state = null, action) => {
  switch(action.type) {

  case 'LOGIN':
    return action.data

  case 'LOGOUT':
    return null

  case 'LOGGED_IN':
    return action.data

  default:
    return state
  }
}

export const userLogin = (credentials) => {
  return async dispatch => {
    const login = await loginService.login(credentials)
    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(login)
    )
    blogService.setToken(login.token)

    dispatch({
      type: 'LOGIN',
      data: login
    })
  }
}

export const userLogout = () => {
  window.localStorage.removeItem('loggedBlogappUser')
  blogService.setToken(null)
  return {
    type: 'LOGOUT',
    data: null
  }
}

export const loggedIn = (credentials) => {
  return {
    type: 'LOGGED_IN',
    data: credentials
  }
}

export default logReducer
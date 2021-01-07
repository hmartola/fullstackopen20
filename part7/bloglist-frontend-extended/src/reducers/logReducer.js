import loginService from '../services/login'
import blogService from '../services/blogs'
import { showMessage } from './messageReducer'

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
    try {
      const login = await loginService.login(credentials)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(login)
      )
      blogService.setToken(login.token)

      dispatch({
        type: 'LOGIN',
        data: login
      })
      dispatch(showMessage({ type: 'ok', content: `Welcome ${login.username}` }, 5))

    } catch (e) {
      dispatch(showMessage({ type: 'error', content: 'Invalid password or username' }, 5))
    }
  }
}

export const userLogout = () => {
  return async dispatch => {
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      blogService.setToken(null)
      dispatch({
        type: 'LOGOUT'
      })
      dispatch(showMessage({ type: 'ok', content: 'Logged out' }, 5))

    } catch (e) {
      dispatch(showMessage({ type: 'error', content: 'Error logging out' }, 5))
    }
  }
}

export const loggedIn = (credentials) => {
  return {
    type: 'LOGGED_IN',
    data: credentials
  }
}

export default logReducer
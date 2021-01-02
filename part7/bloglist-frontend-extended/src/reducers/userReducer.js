import userService from '../services/users'

const userReducer = (state = [], action) => {
  switch(action.type) {
  case 'USER_INFO':
    return action.data

  default:
    return state
  }
}

export const userList = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'USER_INFO',
      data: users
    })
  }
}

export default userReducer
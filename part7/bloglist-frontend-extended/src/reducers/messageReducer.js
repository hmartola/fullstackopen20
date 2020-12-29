const messageReducer = (state = '', action) => {
  switch (action.type) {
  case 'SET_MESSAGE':
    return action.content

  case 'HIDE_MESSAGE':
    return ''

  default:
    return state
  }
}

let timeout

export const showMessage = (content, length) => {
  return async dispatch => {

    if (timeout !== null)
      clearTimeout(timeout)

    dispatch({
      type: 'SET_MESSAGE',
      content,
    })
    timeout = setTimeout(() => {
      dispatch(hideMessage())
    }, 1000*length)
  }
}

export const hideMessage = () => {
  return {
    type: 'HIDE_MESSAGE'
  }
}

export default messageReducer
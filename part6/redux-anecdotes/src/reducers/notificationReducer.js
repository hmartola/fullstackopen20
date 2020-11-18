const notificationReducer = (state = '', action) => {
    switch (action.type) {
      case 'SET_NOTIFICATION':
        return action.notification 
        
      case 'HIDE_NOTIFICATION':
          return ''

      default:
        return state
    }
  }

let timeout

export const showNotification = (notification, length) => {
  return async dispatch => {
    
    if (timeout !== null)
      clearTimeout(timeout)

    dispatch({
      type: 'SET_NOTIFICATION',
      notification,
    })
    timeout = setTimeout(() => {
        dispatch(hideNotification())
    }, 1000*length)
  }
}

export const hideNotification = () => {
    return {
        type: 'HIDE_NOTIFICATION'
    }
}

export default notificationReducer
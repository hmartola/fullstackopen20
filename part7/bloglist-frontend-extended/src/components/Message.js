import React from 'react'
import { useSelector } from 'react-redux'

const Message = () => {
  const message = useSelector(state => state.message)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (!message) {
    return null
  }

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Message
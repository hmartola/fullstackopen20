import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Message = () => {
  const message = useSelector(state => state.message)

  if (!message || !message.content) {
    return null
  }

  if (message.type === 'ok') {
    return (
      <div>
        <Alert variant={'success'}>
          {message.content}
        </Alert>
      </div>
    )
  } else if (message.type === 'error') {
    return (
      <div>
        <Alert variant={'danger'}>
          {message.content}
        </Alert>
      </div>
    )
  }
}

export default Message
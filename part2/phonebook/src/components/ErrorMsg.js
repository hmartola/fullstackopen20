import React from 'react'

const ErrorMsg = ({ message }) => {
    if (message === null) {
        return null
      }
    
    return (
        <div className="error">
            {message}
        </div>
    )
}

export default ErrorMsg
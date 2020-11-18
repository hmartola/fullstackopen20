import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'


const AnectdoteForm = (props) => {
    //const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createAnecdote(content)
        props.showNotification(`added '${content}' to list of anecdotes`, 5)
    }

    return (
        <form onSubmit={addAnecdote}>
            <h2>create new</h2>
            <input name="anecdote"></input>
            <button type="submit">create</button>
        </form>
    )
}

export default connect(null, { createAnecdote, showNotification })(AnectdoteForm)
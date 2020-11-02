import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnectdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
    }

    return (
        <form onSubmit={addAnecdote}>
            <h2>create new</h2>
            <input name="anecdote"></input>
            <button type="submit">create</button>
        </form>
    )
}

export default AnectdoteForm
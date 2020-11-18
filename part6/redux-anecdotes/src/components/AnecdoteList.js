import React from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

    // ------- PREVIOUS CODE USING HOOK-API ------- //

    /* const anecdotes = useSelector(({ anecdotes, filter}) => {
        if (filter === ''){
            return anecdotes
        } else {
            return anecdotes.filter(match =>
                match.content.toLowerCase().includes(filter.toLowerCase()))
        }
    })
    const dispatch = useDispatch() */

    const vote = (anecdote) => {
        console.log('vote', anecdote.id)
        props.voteAnecdote(anecdote)
        props.showNotification(`You voted '${anecdote.content}'`, 5)
    } 

    return (
        <div>
        {props.anecdotes
            .sort((a,b) => a.votes < b.votes ? 1 : -1)
            .map(anecdote =>
            <div key={anecdote.id}>
                <div>
                {anecdote.content}
                </div>
                <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
                </div>
            </div>
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    if (state.filter === ''){
        return { anecdotes: state.anecdotes }
    } else {
        return { anecdotes: state.anecdotes.filter(match =>
            match.content.toLowerCase().includes(state.filter.toLowerCase())) }
    }
}

const mapDispatchToProps = {
    voteAnecdote,
    showNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

import React, { useState } from 'react'
import ReactDOM from 'react-dom'

let oldRnd = 0

const App = (props) => {

  const array = Array(anecdotes.length).fill(0)

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(array)

  let top = votes.indexOf(Math.max(...votes))

  const NextRandom = () => {
    const min = Math.ceil(0);
    const max = Math.floor(anecdotes.length);
    let newRnd = Math.floor(Math.random() * (max - min) + min)
    if (newRnd !== oldRnd) {
      setSelected(newRnd)
      oldRnd = newRnd
    } else {
      NextRandom()
    }
  }

  const Vote = () => {
    const addVote = [...votes]
    addVote[selected] += 1
    setVotes(addVote)
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {props.anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
      <div>
        <button onClick={() => Vote()}>vote</button>
        <button onClick={() => NextRandom()}>next anecdote</button>
      </div>
      <h2>Anecdote with the most votes</h2>
      <p>{props.anecdotes[top]}</p>
      <p>has {votes[top]} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)

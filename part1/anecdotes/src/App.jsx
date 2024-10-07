import { useState } from 'react'

import Button from './Button'

function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const anecdotesLength = anecdotes.length 
  
  const [selected, setSelected] = useState(0)
  const [points, setPoint] = useState(Array(anecdotesLength).fill(0))

  const clickHandle = () => {
    setSelected(Math.floor(Math.random() * anecdotesLength))
  }

  const addVote = () => {
    const pointsCopy = [...points] //because React states are unmutable, so we make new copy
    pointsCopy[selected] += 1 //change only one value
    setPoint(pointsCopy) //set new state value (from copy)
  }

  const maxVotes = Math.max(...points); 
  const maxVotesIndex = points.indexOf(maxVotes);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Button onClick={addVote} text="vote"></Button>
      <Button onClick={clickHandle} text="next anecdote"></Button>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[maxVotesIndex]}</p>
      <p>has {maxVotes} votes</p>
    </div>
  )
}

export default App

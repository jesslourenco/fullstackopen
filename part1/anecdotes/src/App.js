import { useState } from 'react'

const Max = ({votes, anecdotes}) => {
  const max = Math.max(...votes)
  const index = votes.indexOf(max)
  if (max > 0){
    return (
      <>
      <h1>Anedocte with the most votes</h1>
       <b>"{anecdotes[index]}</b>
       <br></br>
       This anecdote has {max} votes
      </>
    )
  }
  return (
    <></>
  )

}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [selected, setSelected] = useState(0)

  const handleClick = () => {
    let next = selected

    while (next === selected){
      next = Math.floor(Math.random() * anecdotes.length)
    }

    setSelected(next)
  }

  const handleVote = () => {
    let copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day:</h1>
      <b>"{anecdotes[selected]}"</b>
      <br></br>
      This anecdote has {votes[selected]} votes
      
      <div>
        <button onClick={handleVote}>vote</button>
        <button onClick={handleClick}>next anecdote</button>
      </div>

      <div>
        <Max votes={votes} anecdotes={anecdotes}/>
      </div>

    </div>
  )
}

export default App

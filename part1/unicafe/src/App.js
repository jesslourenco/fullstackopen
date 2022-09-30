import { useState } from 'react'

const Button = ({ handleClick, feedback }) => (<button onClick={handleClick}>{feedback}</button>)

const Statistics = ({good, neutral, bad}) =>{

  const sum =  good + neutral + bad
  const average = (good - bad) / sum()
  const positive = (good / sum()) * 100
  
  if (sum > 0) {
    return (
      <table>
        <tbody>
          <StatisticLine calc="good" total={good}/>
          <StatisticLine calc="neutral" total={neutral}/>
          <StatisticLine calc="bad" total={bad}/>
          <StatisticLine calc="all" total={sum}/>
          <StatisticLine calc="average" total={average.toFixed(1)}/>
          <StatisticLine calc="positive" total={positive.toFixed(1)} percentage={true}/>
          </tbody>
      </table>

    )
  }
  
  return (<> No feedback given </>)
  
}

const StatisticLine = ({ calc, total, percentage}) =>(
    <tr>
    <td>{calc}</td>
      <td>{total} {percentage ? '%' : ''}</td>
    </tr>
)
  

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} feedback="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} feedback="neutral" />
      <Button handleClick={() => setBad(bad + 1)} feedback="bad" />

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
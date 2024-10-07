import { useState } from 'react'
import Button from './Button'
import Statistics from './Statistics '

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  const totalClicks  = good + neutral + bad



  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} name="good"></Button>
      <Button onClick={handleNeutralClick} name="neutral"></Button>
      <Button onClick={handleBadClick} name="bad"></Button>
      <Statistics good={good} neutral={neutral} bad={bad} sum={totalClicks}></Statistics>
    </div>
  )
}

export default App
import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Statistics = ({good, neutral, bad}) => {

  const total = good + neutral + bad
  const avg = (good - bad)/total
  const posAvg = good/total*100

  if (total === 0) {
    return (
      <div>
      <h3>Statistics:</h3>
      <p>no feedback given</p>
      </div>
    )
  }

  return (
  <div>
    <h3>Statistics:</h3>
    <table>
      <tbody>
      <Statistic title="good" value={good}/>
      <Statistic title="neutral" value={neutral}/>
      <Statistic title="bad" value={bad}/>
      <Statistic title="total" value={total}/>
      <Statistic title="average" value={avg}/>
      <Statistic title="positive" value={posAvg + " %"}/>
      </tbody>
    </table>
  </div>
  )
}

const Statistic = ({title, value}) => {
  return (
  <div>
    <tr>
      <td>{title}</td>
      <td>{value}</td>
    </tr>
  </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
 
  const good_feedback = () => setGood(good + 1)
    
  const neutral_feedback = () => setNeutral(neutral + 1)
    
  const bad_feedback = () => setBad(bad + 1)
    
  return (
    <div>
      <h3>Give feedback:</h3>
      <Button onClick={good_feedback} text="good"/>
      <Button onClick={neutral_feedback} text="neutral"/>
      <Button onClick={bad_feedback} text="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
  
}
const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
  
)

ReactDOM.render(<App />, 
  document.getElementById('root')
)


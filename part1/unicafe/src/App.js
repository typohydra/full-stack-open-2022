import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>

const StatisticLine = ({text, value}) => <p>{text} {value} {text === 'positive' ? '%' : ''}</p>

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = (good / all) * 100

  if (good || neutral || bad) {
    return (
      <div>
        <StatisticLine text='good' value={ good } />
        <StatisticLine text='neutral' value={ neutral } />
        <StatisticLine text='bad' value={ bad } />
        <StatisticLine text='all' value={ all } />
        <StatisticLine text='average' value={ average } />
        <StatisticLine text='positive' value={ positive } />
      </div>
    )
  }
  else {
    return (
      <div>No feedback given</div> 
    )
  }
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text='give feedback'/>
      <Button text='good' handleClick={() => setGood(good + 1)}/>
      <Button text='neutral' handleClick={() => setNeutral(neutral + 1)}/>
      <Button text='bad' handleClick={() => setBad(bad + 1)}/>

      <Header text='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
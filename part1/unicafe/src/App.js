import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>

const TableRow = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value} { text === 'positive' ? '%' : ''}</td>
  </tr>
)

const DisplayTable = ({good, neutral, bad, all, average, positive}) => (
  <table>
    <tbody>
      <TableRow text='good' value={ good } />
      <TableRow text='neutral' value={ neutral } />
      <TableRow text='bad' value={ bad } />
      <TableRow text='all' value={ all } />
      <TableRow text='average' value={ average } />
      <TableRow text='positive' value={ positive } />
    </tbody>
  </table>
)

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = (good / all) * 100

  if (good || neutral || bad) { 
    return (
      <div>
        <DisplayTable 
          good={good}
          neutral={neutral}
          bad={bad}
          all={all}
          average={average}
          positive={positive} />
      </div> 
    )
  }
  else { return <div>No feedback given</div> }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text='give feedback' />
      <Button text='good' handleClick={() => setGood(good + 1)} />
      <Button text='neutral' handleClick={() => setNeutral(neutral + 1)} />
      <Button text='bad' handleClick={() => setBad(bad + 1)} />

      <Header text='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
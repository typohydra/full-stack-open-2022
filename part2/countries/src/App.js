import {useState, useEffect} from  'react'
import axios from 'axios'
import DisplayResult from './components/DisplayResult'

const App = () => {
  const [search, setSearch] = useState('')
  const[countries, setCountries] = useState([])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const countreisToDisplay = countries.filter(
    country => (country.name.common).toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      find countries <input value={search} onChange={handleSearchChange}/>
      <DisplayResult search={search} countries={countreisToDisplay} />  
    </>
  )
}

export default App;

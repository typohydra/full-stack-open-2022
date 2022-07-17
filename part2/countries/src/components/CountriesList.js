const CountriesList = ({setSearch, countries}) => (
  <ul>
    {countries.map(country => 
      <li key={country.cca2}>
        {country.name.common}
        <button onClick={() => setSearch(country.name.common)} >
          show
        </button>
      </li>
    )}
  </ul>
)

export default CountriesList
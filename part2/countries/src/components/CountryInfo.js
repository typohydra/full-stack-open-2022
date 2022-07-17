const CountryInfo = ({country}) =>  {
  return(

  <div>
    <h1>{country.name.common}</h1>
    <div>capital(s): {country.capital.join(', ')}</div>
    <div>area: {country.area}</div>

    <h3>languages:</h3>
    <ul>
      { 
        Object.values(country.languages).map(language => <li key={language}>{language}</li>)
      }
    </ul>
    <img src={country.flags.png} alt={`${country.name.common} flag`} />
  </div>
)}

export default CountryInfo
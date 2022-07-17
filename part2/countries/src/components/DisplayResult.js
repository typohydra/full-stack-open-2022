import CountryInfo from "./CountryInfo"
import CountriesList from "./CountriesList"

const DisplayResult = ({search, countries}) => {
  if(search.trim().length) {
    if( countries.length > 10) {
      return <div>Too many matches, specify another filter</div>
    }
    else if( countries.length > 1) {
     return <CountriesList countries={countries}/>
    }
    else if (countries.length === 1) {
      return <CountryInfo country={countries[0]} />
    }
  }
}

export default DisplayResult
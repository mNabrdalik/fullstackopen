import { useState, useEffect } from 'react'
import axios from 'axios'


function App() {
  const dataUrl = 'https://studies.cs.helsinki.fi/restcountries/api/';
  const [countries, setCountries] = useState([]);
  const [searchValue, setSearchValue] = useState("")
  const [result, setSearchResults ] = useState("")

// Fetch all countries once on mount
useEffect(() => {
  axios.get(`${dataUrl}/all`)
    .then(response => setCountries(response.data))
    .catch(error => {
      console.error("Error fetching countries:", error);
      setSearchResults(<p>Failed to load data, please try again later.</p>);
    });
}, []);
  
// Filter countries based on searchValue
  useEffect(() => {

    if (searchValue === "") {
      setSearchResults(null); // Or a message like "Start typing to search..."
      return;
    }

    const searchQuery = searchValue.toLowerCase();

    const filteredCountries = countries.filter(country =>
      country.name.common.toLowerCase().includes(searchQuery)
    );        
        
    const filteredCountriesLength = filteredCountries.length

    if(filteredCountriesLength > 10) {
      setSearchResults (<p>Too many matches, specify another filter</p>)

    } else if (filteredCountriesLength <= 10 && filteredCountriesLength > 1) {
      const countriesList = filteredCountries.map(country => (
        <div key={country.cca3}>
          <p>{country.name.common}</p>
        </div>
      ));
      setSearchResults (countriesList)

    } else if (filteredCountriesLength === 1){
      const oneCountry = filteredCountries[0]
      const langList = Object.entries(oneCountry.languages).map(([key, value]) => (
        <li key={key}>{value}</li>
      ));
      const countryInfo = (
        <div>
          <h2>{oneCountry.name.common}</h2>
          <p>capital {oneCountry.capital}</p>
          <p>area {oneCountry.area}</p>
          <h3>Languages</h3>
          <ul>{langList}</ul>
          <img src={oneCountry.flags.png} alt={`${oneCountry.name.common} flag`} />
        </div>
      );
      setSearchResults (countryInfo)
    }

  }, [searchValue, countries])

  const onChangeHandler = (event) => {
    setSearchValue(event.target.value)
  }

  return (
    <>
      find countries <input type="text" onChange={onChangeHandler} value={searchValue} placeholder='Type country name'/>
      <div>{result}</div>
    </>
  )
}

export default App

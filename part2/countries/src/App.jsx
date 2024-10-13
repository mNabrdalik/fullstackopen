import { useState, useEffect } from 'react'
import axios from 'axios'

import CountryData from './components/CountryData';
import CountryList from './components/CountryList';

function App() {
  const dataUrl = 'https://studies.cs.helsinki.fi/restcountries/api/';
  const [countries, setCountries] = useState([]);
  const [searchValue, setSearchValue] = useState("")
  const [result, setSearchResults ] = useState("")
  const [visibleCountries, setVisibleCountries] = useState({});

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
      setSearchResults(
        <CountryList
          countries={filteredCountries}
          visibleCountries={visibleCountries}
          toggleVisibility={toggleVisibility}
        />
      );

    } else if (filteredCountriesLength === 1){
      const oneCountry = filteredCountries[0]
      setSearchResults(<CountryData country={oneCountry} />);

    }

  }, [searchValue, countries, visibleCountries])

  const toggleVisibility  = (countryId) => {
    setVisibleCountries(prev => ({
      ...prev,
      [countryId]: !prev[countryId] // zmienia widoczność dla konkretnego kraju
    }));
  }

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

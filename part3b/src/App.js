import { useState, useEffect } from "react";
import axios from "axios";
import CountryDetails from "./components/CountryDetails";

const App = () => {

  const [ countries, setCountries ] = useState([])
  const [ searchQuery, setSearchQuery ] = useState("")
  const [ viewCountry, setViewCountry ] = useState({})

  const hook = () => {
    axios.get('https://restcountries.com/v3.1/all').then(
      response => {
        setCountries(response.data.map(
          country => ({
            name: country.name.common,
            capital: country.capital,
            area: country.area,
            language: country.languages,
            flag: country.flag,
            flags: country.flags
          })
        ))
      }
    )
  }
  useEffect(hook, [])

  const filterCountries = countries.filter(
    country => country.name.toLowerCase().includes(searchQuery)
  )

  const handleChange = (setValue) => (event) => setValue(event.target.value.toLowerCase())

  const handleViewCountry = (event) => () => setViewCountry(filterCountries.filter(country => country.name.includes(event))[0])

  return (
    <div>
      <p>find countries <input value={searchQuery} onChange={handleChange(setSearchQuery)} /></p>
      {filterCountries.length > 10 && (
        <p>Too many matches, specify another filter</p>
      )}
      {filterCountries.length <= 10 && filterCountries.length > 1 && filterCountries.map(
        country => (
          <ul key={country.name}>
            <li>{country.name} <button onClick={handleViewCountry(country.name)}>show</button></li>
          </ul>
        )
      )}
      {filterCountries.length === 1 && (
        <CountryDetails country={filterCountries[0]} />
      )}
      {viewCountry.name && (
        <CountryDetails country={viewCountry} />
      )}
    </div>
  )
}

export default App;
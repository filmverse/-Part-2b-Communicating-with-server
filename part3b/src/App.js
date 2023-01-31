import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {

  const [ countries, setCountries ] = useState([])
  const [ searchQuery, setSearchQuery ] = useState("")

  const hook = () => {
    axios.get('https://restcountries.com/v3.1/all').then(
      response => {
        console.log(response.data)
        setCountries(response.data.map(
          country => ({
            name: country.name.common,
            capital: country.capital,
            area: country.capital,
            language: country.languages,
            flag: country.flag,
            flags: country.flags
          })
        ))
      }
    )
  }
  useEffect(hook, [])

  const handleChange = (setValue) => (event) => setValue(event.target.value)

  return (
    <div>
      <p>find countries <input value={searchQuery} onChange={handleChange(setSearchQuery)} /></p>
      {countries.map(cname => <p key={cname.name}>{cname.name}</p>)}
    </div>
  )
}

export default App;
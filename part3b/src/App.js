import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {

  const [ countries, setCountries ] = useState([])

  const hook = () => {
    axios.get('https://restcountries.com/v3.1/all').then(
      response => {
        console.log(response.data)
        setCountries(response.data)
      }
    )
  }
  useEffect(hook, [])

  return (
    <div>
      {countries.map(country => (
        <p key={country.name.common}>{country.name.common}</p>
      ))}
    </div>
  )
}

export default App;
import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {

  const [ person, setPerson ] = useState([])

  console.log(person)

  const hook = () => {
    axios.get('http://localhost:3001/persons').then(
      response => {
        setPerson(response.data)
      }
    )
  }
  useEffect(hook, [])

  return (
    <div>
      <h1>Phonebook</h1>
    </div>
  )
}

export default App;
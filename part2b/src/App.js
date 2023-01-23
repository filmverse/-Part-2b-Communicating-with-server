import { useState, useEffect } from "react";
import axios from "axios";
import Person from "./components/Person";

const App = () => {

  const [ persons, setPersons ] = useState([])

  const hook = () => {
    axios.get('http://localhost:3001/persons').then(
      response => {
        setPersons(response.data)
      }
    )
  }
  useEffect(hook, [])

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>add a new</h2>
      <form>
        name: <input /><br />
        number: <input /><br />
        <button>add</button>
      </form>
      {persons.map(person => (
        <Person key={person.id} phoneBookPerson={person} />
      ))}
    </div>
  )
}

export default App;
import { useState, useEffect } from "react";
import axios from "axios";
import Person from "./components/Person";

const App = () => {

  const [ persons, setPersons ] = useState([])
  const [ personName, setPersonName ] = useState("")
  const [ personNumber, setPersonNumber ] = useState("")

  const hook = () => {
    axios.get('http://localhost:3001/persons').then(
      response => {
        setPersons(response.data)
      }
    )
  }
  useEffect(hook, [])

  const handleChange = (setValue) => (event) => setValue(event.target.value)

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>add a new</h2>
      <form>
        name: <input value={personName} onChange={handleChange(setPersonName)} /><br />
        number: <input value={personNumber} onChange={handleChange(setPersonNumber)} /><br />
        <button>add</button>
      </form>
      {persons.map(person => (
        <Person key={person.id} phoneBookPerson={person} />
      ))}
      Debug name: {personName}<br />
      Debug number: {personNumber}
    </div>
  )
}

export default App;
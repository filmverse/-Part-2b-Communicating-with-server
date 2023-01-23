import { useState, useEffect } from "react";
import axios from "axios";
import Person from "./components/Person";
import PersonForm from "./components/personForm";

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

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: personName,
      number: personNumber
    }
    axios.post('http://localhost:3001/persons', newPerson).then(
      response => {
        setPersons(persons.concat(response.data))
        setPersonName("")
        setPersonNumber("")
      }
    )
  }

  const handleChange = (setValue) => (event) => setValue(event.target.value)

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>add a new</h2>
      <PersonForm
        name={personName}
        number={personNumber}
        changeName={handleChange(setPersonName)}
        changeNumber={handleChange(setPersonNumber)}
        addPerson={addPerson}
      />
      {/* <form onSubmit={addPerson}>
        name: <input value={personName} onChange={handleChange(setPersonName)} /><br />
        number: <input value={personNumber} onChange={handleChange(setPersonNumber)} /><br />
        <button type="submit">add</button>
      </form> */}
      {persons.map(person => (
        <Person key={person.id} phoneBookPerson={person} />
      ))}
      Debug name: {personName}<br />
      Debug number: {personNumber}
    </div>
  )
}

export default App;
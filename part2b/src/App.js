import { useState, useEffect } from "react";
import Person from "./components/Person";
import PersonForm from "./components/PersonForm";
import PersonFilter from "./components/PersonFilter";
import Book from "./services/Book";

const App = () => {

  const [ persons, setPersons ] = useState([])
  const [ personName, setPersonName ] = useState("")
  const [ personNumber, setPersonNumber ] = useState("")
  const [ filterPerson, setFilterPerson ] = useState("")
  const [ successMessage, setSuccessMessage ] = useState(null)

  const hook = () => {
    Book.getAll().then(
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
    const findPerson = persons.find(person => person.name === personName)
    if (findPerson) {
      if (window.confirm(`${personName} is already added to phonebook, replace the old number with a new one?`)){
        Book.update(findPerson.id, newPerson).then(
          response => {
            setPersons(persons.map(person => person.id !== findPerson.id ? person : response.data))
            setPersonName("")
            setPersonNumber("")
            setSuccessMessage(`${newPerson.name} is updated successfully`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          }
        )
      }
    } else {
      Book.create(newPerson).then(
        response => {
          setPersons(persons.concat(response.data))
          setPersonName("")
          setPersonNumber("")
          setSuccessMessage(`${newPerson.name} is added successfully`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        }
      ) 
    }
  }

  const removePerson = (id, name) => () => {
    if (window.confirm(`Delete ${name}?`)) {
      Book.remove(id).then(() => {
        setPersons(persons.filter(person => person.name !== name))
      })
    }
  }

  const SuccessNotification = ({ message }) => {
    if (message === null) {
      return null
    }

    return (
      <div className="success">
        {message}
      </div>
    )
  }

  const handleChange = (setValue) => (event) => setValue(event.target.value)

  return (
    <div>
      <h1>Phonebook</h1>

      <SuccessNotification message={successMessage} />

      <PersonFilter filterName={filterPerson} changeFilterName={handleChange(setFilterPerson)} />

      <h2>add a new</h2>

      <PersonForm
        name={personName}
        number={personNumber}
        changeName={handleChange(setPersonName)}
        changeNumber={handleChange(setPersonNumber)}
        addPerson={addPerson}
      />

      <Person
        persons={persons}
        filterPerson={filterPerson}
        removePerson={removePerson}
      />

      Debug name: {personName}<br />
      Debug number: {personNumber}<br />
      Debug filter: {filterPerson}
    </div>
  )
}

export default App;
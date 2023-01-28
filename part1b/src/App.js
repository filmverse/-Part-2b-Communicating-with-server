import { useState, useEffect } from "react";
import Note from "./components/Note";
import noteService from "./services/notes";

const App = () => {

  const [ notes, setNotes ] = useState([])
  const [ newNote, setNewNote ] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('some error happened...')

  const hook = () => {
    noteService.getAll().then(iNotes => {
      setNotes(iNotes)
    })
  }
  useEffect(hook, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    }
    noteService.create(noteObject).then(
      iNotes => {
        setNotes(notes.concat(iNotes))
        setNewNote('')
      }
    )
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  console.log(showAll)

  const toggleImportanceOf = (id) => {
    // console.log(`importance of ${id} needs to be toggled`)
    // const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}
    noteService.update(id, changedNote).then(iNotes => {
      setNotes(notes.map(note => note.id !== id ? note : iNotes))
    })
    .catch(error => {
      setErrorMessage(
        `Note '${note.content}' was already removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setNotes(notes.filter(n => n.id !== id))
    })
  }

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    return (
      <div className='error'>
        {message}
      </div>
    )
  }

  const Footer = () => {
    const footerStyle = {
      color: 'green',
      fontStyle: 'italic',
      fontSize: 16
    }
    return (
      <div style={footerStyle}>
        <br />
        <em>Note app, Department of Computer Science, University of Helsinki 2022</em>
      </div>
    )
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
      <ul>
        {notesToShow.map(notemap => <Note
          key={notemap.id}
          note={notemap}
          toggleImportance={() => toggleImportanceOf(notemap.id)}
        />)}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
      debug: {newNote}
      <Footer />
    </div>
  )
}

export default App;
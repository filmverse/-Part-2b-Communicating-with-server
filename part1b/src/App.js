import { useState, useEffect } from "react";
import axios from "axios";
import Note from "./components/Note";

const App = () => {

  const [ notes, setNotes ] = useState([])
  const [ newNote, setNewNote ] = useState('')
  const [showAll, setShowAll] = useState(true)

  const hook = () => {
    axios.get('http://localhost:3001/notes').then(response => {
      setNotes(response.data)
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
    axios.post('http://localhost:3001/notes', noteObject).then(
      response => {
        setNotes(notes.concat(response.data))
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

  return (
    <div>
    <h1>Notes</h1>
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
      <ul>
        {notesToShow.map(notemap => <Note key={notemap.id} note={notemap} />)}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
      debug: {newNote}
    </div>
  )
}

export default App;
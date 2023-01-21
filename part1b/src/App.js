import { useState, useEffect } from "react";
import axios from "axios";
import Note from "./components/Note";

const App = () => {

  const [ notes, setNotes ] = useState([])

  console.log(notes)

  const hook = () => {
    axios.get('http://localhost:3001/notes').then(response => {
      console.log(response.data)
      setNotes(response.data)
    })
  }
  useEffect(hook, [])

  return (
    <div>
      <ul>
        {notes.map(notemap => <Note key={notemap.id} note={notemap} />)}
      </ul>
    </div>
  )
}

export default App;
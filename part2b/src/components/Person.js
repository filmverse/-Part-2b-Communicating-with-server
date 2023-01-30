
const Person = ({ persons, filterPerson, removePerson }) => {
    return (
        <div>
            {persons
                .filter(person => person.name.toLowerCase().includes(filterPerson))
                .map(person => (
                    <p key={person.id} className='note'>{person.name}: {person.number} <button onClick={removePerson(person.id, person.name)}>delete</button></p>
                ))
            }
        </div>
    )
}

export default Person;
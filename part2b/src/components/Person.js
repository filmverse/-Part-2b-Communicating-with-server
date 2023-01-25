
const Person = ({ persons, filterPerson }) => {
    return (
        <div>
            {persons
                .filter(person => person.name.toLowerCase().includes(filterPerson))
                .map(person => (
                    <p key={person.id}>{person.name}: {person.number}</p>
                ))
            }
        </div>
    )
}

export default Person;